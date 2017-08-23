/**
 *
 * @author 
 *
 */
class GameLogic {
    public constructor() {
    }

    public static gameHost = 'http://192.168.10.7:8080/ema-im/game/startGame?appId=100000';
    public static appId = 100000;
    private static _instance: GameLogic;
    private WebSocket: egret.WebSocket;
    public player: number;
    public endplay: number = 0;
    public static getInstance(): GameLogic {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    }

    public GameStage: egret.Stage;
    public GameStage_width: number;
    public GameStage_height: number;

    public main: MainScene;
    public game: GameScene;
    //game info
    public userId: number;
    public roomId: number;

    public data: MonsterVO[];
    public shipData: ShipVO[];
    private oldReqTime: number;
    private currentReqTime: number;


    public startMain(): void {
        this.removeGame();
        if (this.main == null) {
            this.main = new MainScene();
        }
        this.GameStage.addChild(this.main);
    }

    public removeMain(): void {
        if (this.main != null && this.main.parent != null) {
            this.main.parent.removeChild(this.main);
        }
    }

    public getMonsterVOByID(id: number): MonsterVO {
        for (var i: number = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) {
                return this.data[i];
            }
        }
        return null;
    }



    //socket连接成功之后的处理// kongbai
    private onSocketOpen(): void {
        if (this.player == 2) {
            this.sendGameData(Util.CHECK_USER, '');
            this.sendGameData(Util.SEND_MESSAGE, 'allReady');
        } else {
            this.sendGameData(Util.CHECK_USER, '');
            this.sendGameData(Util.SEND_MESSAGE, 'create');
        }
    }

    public sendGameData(handler: number, gameAction: string) {
        let sendStr = Util.sendMsg(handler, gameAction);
        console.log("the send data: " + sendStr);
        this.WebSocket.writeUTF(sendStr);
    }

    private closeSocket(): void {
        this.WebSocket.close();
    }

    //socket获得数据之后的处理，测试git
    private onReceiveMessage(): void {
        let msg = this.WebSocket.readUTF();
        let recData = Util.deconstruct(msg);
        // console.log(recData['gd'].type);
        this.currentReqTime = +new Date();
        // console.log(this.currentReqTime);
        // var recStack = new Stack();

        if (recData['handler'] == Util.SEND_MESSAGE) {
            switch (recData['gd'].type) {
                case 'leave':
                    this.closeSocket();
                    this.endplay = 1;
                    console.log(this.endplay);
                    break;
                case 'startGame':
                    //do recData.msg
                    this.createGame(recData['gd']);
                    this.beginGame();
                    this.game.initMonsters();
                    this.game.ship_1p.setPos();
                    this.game.ship_2p.setPos();
                    break;
                case 'updateTank':
                    if (this.oldReqTime && this.oldReqTime < this.currentReqTime) {
                        this.changePos(recData['gd']);
                        this.game.initMonsters();
                        this.game.ship_1p.setPos();
                        this.game.ship_2p.setPos();
                        this.game.setScore();
                    }
                    this.oldReqTime = this.currentReqTime;
                    break;
            }
        } else if (recData['handler'] == Util.LEAVE_ROOM) {
            this.closeSocket();
        }
    }
    private changePos(tank: Object): void {
        let arr: Object[] = RES.getRes("mission_json");
        if (this.data != null) {
            this.data = [];
            for (let i: number = 0; i < tank['fishList'].length; i++) {
                //鱼的数据
                let vo: MonsterVO = new MonsterVO();
                vo.id = tank['fishList'][i]['type'];
                vo.image = arr[vo.id]['image'];
                vo.score = parseInt(arr[vo.id]['score']);
                vo.swimDirection = tank['fishList'][i]['direction'];
                vo.swimSpeed = parseInt(arr[vo.id]['swimSpeed']);
                vo.xPos = parseInt(tank['fishList'][i]['x']);
                vo.yPos = parseInt(tank['fishList'][i]['y']);
                // vo.ropeXPos= parseInt(tank['fishList'][i]['y'];
                this.data.push(vo);
            }
        }

        if (this.shipData != null) {
            //钩子的数据
            let vo1: ShipVO = new ShipVO();
            vo1.xPos = tank['leftHook'].x;
            vo1.yPos = tank['leftHook'].y;
            vo1.score = tank['leftHook'].score;
            vo1.r = tank['leftHook'].r;
            vo1.throwDirection = tank['leftHook'].throwDirection;
            vo1.rollDirection = tank['leftHook'].rollDirection;
            vo1.isThrowing = tank['leftHook'].isThrowing;
            vo1.hookedFishType = tank['leftHook'].hookedFishType;
            vo1.backMV = this.shipData[0].backMV;
            if (vo1.isThrowing == '1' && vo1.hookedFishType >= 0) {
                if (!vo1.backMV) {
                    let vo: MonsterVO = new MonsterVO();

                    vo.id = vo1.hookedFishType;
                    vo.image = arr[vo.id]['image'];
                    vo.xPos = vo1.xPos - arr[vo.id]['width'] / 2;
                    vo.yPos = vo1.yPos - 0 + 48 - arr[vo.id]['height'] / 2;


                    this.game.monsterBack(vo, 0);
                    vo1.backMV = true;
                }
            }
            console.log(vo1.xPos, vo1.yPos);
            if (vo1.isThrowing == '0') {
                vo1.backMV = false;
            }
            this.shipData[0] = vo1;
            let vo2: ShipVO = new ShipVO();
            vo2.xPos = tank['rightHook'].x;
            vo2.yPos = tank['rightHook'].y;
            vo2.score = tank['rightHook'].score;
            vo2.r = tank['rightHook'].r;
            vo2.throwDirection = tank['rightHook'].throwDirection;
            vo2.rollDirection = tank['rightHook'].rollDirection;
            vo2.isThrowing = tank['rightHook'].isThrowing;
            vo2.hookedFishType = tank['rightHook'].hookedFishType;
            this.shipData[1] = vo2;
            // console.log(vo1.r,vo2.r);
        }
    }

    private beginGame(): void {
        if (this.game == null) {
            this.game = new GameScene(this.player);
        }
        this.GameStage.addChild(this.game);
    }

    private createGame(tank: Object): void {
        if (this.data == null) {
            this.data = [];
            let arr: Object[] = RES.getRes("mission_json");
            for (let i: number = 0; i < tank['fishList'].length; i++) {
                let vo: MonsterVO = new MonsterVO();
                vo.id = tank['fishList'][i]['type'];
                vo.image = arr[vo.id]['image'];
                vo.score = parseInt(arr[vo.id]['score']);
                vo.swimDirection = tank['fishList'][i]['direction'];
                vo.swimSpeed = parseInt(arr[vo.id]['swimSpeed']);
                vo.xPos = parseInt(tank['fishList'][i]['x']);
                vo.yPos = parseInt(tank['fishList'][i]['y']);
                this.data.push(vo);
            }
        }

        if (this.shipData == null) {
            this.shipData = [];
            let vo1: ShipVO = new ShipVO();
            vo1.xPos = tank['leftHook'].x;
            vo1.yPos = tank['leftHook'].y;
            vo1.score = tank['leftHook'].score;
            vo1.r = tank['leftHook'].r;
            this.shipData.push(vo1);
            let vo2: ShipVO = new ShipVO();
            vo2.xPos = tank['rightHook'].x;
            vo2.yPos = tank['rightHook'].y;
            vo2.score = tank['rightHook'].score;
            vo2.r = tank['rightHook'].r;
            this.shipData.push(vo2);
            // console.log(vo1.r,vo2.r);
        }

    }

    /**开始匹配 */
    public startGame(): void {
        this.removeMain();
        let rand = 10000 * Math.random();
        this.userId = Math.floor(rand);
        let req = new egret.HttpRequest();
        req.responseType = egret.HttpResponseType.TEXT;
        req.open(`${GameLogic.gameHost}&uid=${this.userId}&token=100098`, egret.HttpMethod.GET);
        // req.open("http://httpbin.org/get", egret.HttpMethod.GET);
        req.send();
        req.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        req.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    }

    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        egret.log("get data : ", request.response);
        var recData = JSON.parse(request.response);
        if (recData.status == 1) {
            this.onGetIOError(recData.message);
        } else {
            this.roomId = recData.data.roomId;
            this.player = recData.data.gd.player;
            this.WebSocket = new egret.WebSocket();
            this.WebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.WebSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.WebSocket.connect(recData.data.host, recData.data.port);
        }
    }

    private onGetIOError(event: egret.IOErrorEvent): void {
        egret.log("get error : " + event);
    }

    private onGetProgress(event: egret.ProgressEvent): void {
        egret.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

    public removeGame(): void {
        if (this.game != null && this.game.parent != null) {
            this.game.parent.removeChild(this.game);
        }
    }
}
