var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene(player) {
        var _this = _super.call(this) || this;
        _this.score_1p = 0;
        _this.score_2p = 0;
        _this.player = 1;
        _this.player = player;
        _this.skinName = "GameSceneSkin";
        return _this;
    }
    GameScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.monsterArr = [];
        this.score_txt_1p.visible = false;
        this.score_txt_2p.visible = false;
        this.initMonsters();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
    };
    /**初始化怪物数组*/
    GameScene.prototype.initMonsters = function () {
        this.removeMonsters();
        var arr = GameLogic.getInstance().data;
        if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
                var m = new Monster(arr[i]);
                this.addChild(m);
                this.monsterArr.push(m);
            }
        }
        this.monsterStart();
    };
    /**得分*/
    GameScene.prototype.setScore = function () {
        // let score_txt = `score_txt_${player}p`;
        // this[score_txt].text = n.toString();
        // this[score_txt].visible = true;
        this.total_score_txt_1p.text = GameLogic.getInstance().shipData[0].score.toString();
        this.total_score_txt_2p.text = GameLogic.getInstance().shipData[1].score.toString();
        // egret.Tween.get(this[score_txt]).to({ x: this[`total_score_txt_${player}p`].x + 20, y: this[`total_score_txt_${player}p`].y }, 1000).call(function (player: number) {
        //     GameLogic.getInstance().game.clearScore(player);
        // }, this, [player]);
    };
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
    GameScene.prototype.setAnotherScore = function (player, score) {
        if (this.player != player) {
            this["total_score_txt_" + player + "p"].text = score;
        }
    };
    /**加怪*/
    GameScene.prototype.addMonster = function (id, y) {
        var vo = GameLogic.getInstance().getMonsterVOByID(id);
        if (vo != null) {
            console.log(id);
            var m = new Monster(vo);
            this.addChild(m);
            m.y = y;
            console.log(y);
            this.monsterArr.push(m);
            m.start();
        }
    };
    /**怪开始动*/
    GameScene.prototype.monsterStart = function () {
        for (var i = 0; i < this.monsterArr.length; i++) {
            this.monsterArr[i].start();
        }
    };
    /**检测是否抓住*/
    GameScene.prototype.checkCatch = function (player) {
        var current_ship = this["ship_" + player + "p"];
        for (var i = 0; i < this.monsterArr.length; i++) {
            if (ViewUtil.hitTest(this.monsterArr[i], current_ship)) {
                current_ship.catchIt(this.monsterArr[i]);
                this.monsterArr.splice(i, 1);
                break;
            }
        }
    };
    /**出钩*/
    GameScene.prototype.start = function () {
        GameLogic.getInstance().sendGameData(Util.SEND_MESSAGE, 'startThrow');
    };
    /**移除所有怪物*/
    GameScene.prototype.removeMonsters = function () {
        for (var i = 0; i < this.monsterArr.length; i++) {
            if (this.monsterArr[i] != null && this.monsterArr[i].parent != null) {
                this.monsterArr[i].parent.removeChild(this.monsterArr[i]);
                this.monsterArr[i].clear();
                this.monsterArr[i] = null;
            }
        }
        this.monsterArr = [];
    };
    GameScene.prototype.gameOver = function () {
        GameLogic.getInstance().startMain();
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map