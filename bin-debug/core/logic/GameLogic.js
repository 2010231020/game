var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GameLogic = (function () {
    function GameLogic() {
    }
    GameLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    };
    GameLogic.prototype.startMain = function () {
        this.removeGame();
        if (this.main == null) {
            this.main = new MainScene();
        }
        this.GameStage.addChild(this.main);
    };
    GameLogic.prototype.removeMain = function () {
        if (this.main != null && this.main.parent != null) {
            this.main.parent.removeChild(this.main);
        }
    };
    GameLogic.prototype.getMonsterVOByID = function (id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) {
                return this.data[i];
            }
        }
        return null;
    };
    //socket连接成功之后的处理// kongbai
    GameLogic.prototype.onSocketOpen = function () {
        if (this.player == 2) {
            this.sendGameData(Util.CHECK_USER, '');
            this.sendGameData(Util.SEND_MESSAGE, 'allReady');
        }
        else {
            this.sendGameData(Util.CHECK_USER, '');
            this.sendGameData(Util.SEND_MESSAGE, 'create');
        }
    };
    GameLogic.prototype.sendGameData = function (handler, gameAction) {
        var sendStr = Util.sendMsg(handler, gameAction);
        console.log("the send data: " + sendStr);
        this.WebSocket.writeUTF(sendStr);
    };
    GameLogic.prototype.closeSocket = function () {
        this.WebSocket.close();
    };
    //socket获得数据之后的处理，测试git
    GameLogic.prototype.onReceiveMessage = function () {
        var msg = this.WebSocket.readUTF();
        console.log(msg);
        var recData = Util.deconstruct(msg);
        console.log(recData['gd'].type);
        this.currentReqTime = +new Date();
        // console.log(this.currentReqTime);
        // var recStack = new Stack();
        switch (recData['gd'].type) {
            case 'leave':
                this.closeSocket();
                break;
            case 'startGame':
                //do recData.msg
                this.createGame(recData['gd']);
                console.log(recData['gd']);
                this.beginGame();
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
    };
    GameLogic.prototype.changePos = function (tank) {
        if (this.data != null) {
            this.data = [];
            var arr = RES.getRes("mission_json");
            for (var i = 0; i < tank['fishList'].length; i++) {
                var vo = new MonsterVO();
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
        if (this.shipData != null) {
            this.shipData = [];
            var vo1 = new ShipVO();
            vo1.xPos = tank['leftHook'].x;
            vo1.yPos = tank['leftHook'].y;
            vo1.score = tank['leftHook'].score;
            vo1.r = tank['leftHook'].r;
            this.shipData.push(vo1);
            var vo2 = new ShipVO();
            vo2.xPos = tank['rightHook'].x;
            vo2.yPos = tank['rightHook'].y;
            vo2.score = tank['rightHook'].score;
            vo2.r = tank['rightHook'].r;
            this.shipData.push(vo2);
        }
    };
    GameLogic.prototype.beginGame = function () {
        if (this.game == null) {
            this.game = new GameScene(this.player);
        }
        this.GameStage.addChild(this.game);
    };
    GameLogic.prototype.createGame = function (tank) {
        if (this.data == null) {
            this.data = [];
            var arr = RES.getRes("mission_json");
            for (var i = 0; i < tank['fishList'].length; i++) {
                var vo = new MonsterVO();
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
            var vo1 = new ShipVO();
            vo1.xPos = tank['leftHook'].x;
            vo1.yPos = tank['leftHook'].y;
            vo1.score = tank['leftHook'].score;
            vo1.r = tank['leftHook'].r;
            this.shipData.push(vo1);
            var vo2 = new ShipVO();
            vo2.xPos = tank['rightHook'].x;
            vo2.yPos = tank['rightHook'].y;
            vo2.score = tank['rightHook'].score;
            vo2.r = tank['rightHook'].r;
            this.shipData.push(vo2);
        }
    };
    /**开始匹配 */
    GameLogic.prototype.startGame = function () {
        this.removeMain();
        var rand = 10000 * Math.random();
        this.userId = Math.floor(rand);
        var req = new egret.HttpRequest();
        req.responseType = egret.HttpResponseType.TEXT;
        req.open(GameLogic.gameHost + "&uid=" + this.userId + "&token=100098", egret.HttpMethod.GET);
        // req.open("http://httpbin.org/get", egret.HttpMethod.GET);
        req.send();
        req.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        req.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    GameLogic.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        egret.log("get data : ", request.response);
        var recData = JSON.parse(request.response);
        if (recData.status == 1) {
            this.onGetIOError(recData.message);
        }
        else {
            this.roomId = recData.data.roomId;
            this.player = recData.data.gd.player;
            this.WebSocket = new egret.WebSocket();
            this.WebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.WebSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.WebSocket.connect(recData.data.host, recData.data.port);
        }
    };
    GameLogic.prototype.onGetIOError = function (event) {
        egret.log("get error : " + event);
    };
    GameLogic.prototype.onGetProgress = function (event) {
        egret.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    GameLogic.prototype.removeGame = function () {
        if (this.game != null && this.game.parent != null) {
            this.game.parent.removeChild(this.game);
        }
    };
    return GameLogic;
}());
GameLogic.gameHost = 'http://192.168.10.7:8080/ema-im/game/startGame?appId=100000';
GameLogic.appId = 100000;
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map