/**
 *
 * @author 
 *
 */
class GameScene extends eui.Component {
    public ship_1p: Ship;
    public ship_2p: Ship2;
    public monsterArr: Monster[];
    private score_txt_1p: eui.Label;
    private score_txt_2p: eui.Label;
    private total_score_txt_1p: eui.Label;
    private total_score_txt_2p: eui.Label;
    private score_1p: number = 0;
    private score_2p: number = 0;
    private player: number = 1;

    public constructor(player: number) {
        super();
        this.player = player;
        this.skinName = "GameSceneSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        this.monsterArr = [];
        this.score_txt_1p.visible = false;
        this.score_txt_2p.visible = false;
        this.initMonsters();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
    }

    /**初始化怪物数组*/
    public initMonsters(): void {
        this.removeMonsters();

        var arr: MonsterVO[] = GameLogic.getInstance().data;

        if (arr != null) {
            for (var i: number = 0; i < arr.length; i++) {
                var m: Monster = new Monster(arr[i]);
                this.addChild(m);
                this.monsterArr.push(m);
            }
        }
        this.monsterStart();
    }
    /**得分*/
    public setScore(): void {
        // let score_txt = `score_txt_${player}p`;
        // this[score_txt].text = n.toString();
        // this[score_txt].visible = true;
        this.total_score_txt_1p.text = GameLogic.getInstance().shipData[0].score.toString();
        this.total_score_txt_2p.text = GameLogic.getInstance().shipData[1].score.toString();
        // egret.Tween.get(this[score_txt]).to({ x: this[`total_score_txt_${player}p`].x + 20, y: this[`total_score_txt_${player}p`].y }, 1000).call(function (player: number) {
        //     GameLogic.getInstance().game.clearScore(player);
        // }, this, [player]);
    }
    /**清除分数*/
    // private clearScore(player: number): void {
    //     let score_txt = `score_txt_${player}p`;
    //     this[`total_score_txt_${player}p`].text = this[`score_${player}p`].toString();
    //     this[score_txt].visible = false;
    //     this[score_txt].y = 100;
    //     this[score_txt].alpha = 1;

    //     GameLogic.getInstance().sendGameData(new SendData('goOn', {}));
    // }
    /**更改别的玩家分数*/
    public setAnotherScore(player: number, score: string): void {
        if (this.player != player) {
            this[`total_score_txt_${player}p`].text = score;
        }
    }
    /**加怪*/
    public addMonster(id: number, y: number): void {
        var vo: MonsterVO = GameLogic.getInstance().getMonsterVOByID(id);
        if (vo != null) {
            console.log(id);
            var m: Monster = new Monster(vo);
            this.addChild(m);
            m.y = y;
            console.log(y);
            this.monsterArr.push(m);
            m.start();
        }
    }
    /**怪开始动*/
    public monsterStart(): void {
        for (var i: number = 0; i < this.monsterArr.length; i++) {
            this.monsterArr[i].start();
        }
    }

    /**检测是否抓住*/
    public checkCatch(player: number): void {
        let current_ship = this[`ship_${player}p`]
        for (let i: number = 0; i < this.monsterArr.length; i++) {
            if (ViewUtil.hitTest(this.monsterArr[i], current_ship)) {
                current_ship.catchIt(this.monsterArr[i]);
                this.monsterArr.splice(i, 1);
                break;
            }
        }
    }


    /**出钩*/
    private start(): void {
        GameLogic.getInstance().sendGameData(Util.SEND_MESSAGE,'startThrow');
    }

    /**移除所有怪物*/
    private removeMonsters(): void {
        for (var i: number = 0; i < this.monsterArr.length; i++) {
            if (this.monsterArr[i] != null && this.monsterArr[i].parent != null) {
                this.monsterArr[i].parent.removeChild(this.monsterArr[i]);
                this.monsterArr[i].clear();
                this.monsterArr[i] = null;
            }
        }
        this.monsterArr = [];
    }
 
    private gameOver(): void {
        GameLogic.getInstance().startMain();
    }

}
