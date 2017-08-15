var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
/**
 *
 * @author
 *
 */
var Ship2 = (function (_super) {
    __extends(Ship2, _super);
    function Ship2() {
        var _this = _super.call(this) || this;
        _this.catchID = -1;
        _this.h = 540;
        _this.r = 70;
        _this.go = false;
        _this.speed = 3;
        _this.player = 2;
        _this.skinName = "ShipSkin2";
        return _this;
    }
    Ship2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.zeroX = this.x;
        this.zeroY = this.y;
        this.line = new egret.Shape();
        this.parent.addChild(this.line);
        this.prepareStart();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catchIt, this);
    };
    /**抓到东西*/
    Ship2.prototype.catchIt = function (sth) {
        this.changeline();
        this.catched = sth;
        this.catched.x = (40 - sth.width) / 2;
        this.catched.y = 36;
        this.catchID = sth.vo.id;
        sth.clear();
        this.addChild(sth);
        var time = this.getTime(this.getDistance(this.x, this.y));
        this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });
        this.tw2.to({ x: this.zeroX, y: this.zeroY }, time).call(this.setScore, this);
    };
    Ship2.prototype.prepareStart = function () {
        this.isCatch = false;
        // this.tw1 = egret.Tween.get(this, { loop: true });
        // this.rotation = this.r;
        // this.tw1.to({ rotation: -this.r }, 3000).wait(100).to({ rotation: this.r }, 3000);
        this.x = GameLogic.getInstance().shipData[1].xPos;
        this.y = GameLogic.getInstance().shipData[1].yPos;
    };
    Ship2.prototype.setPos = function () {
        this.x = GameLogic.getInstance().shipData[1].xPos;
        this.y = GameLogic.getInstance().shipData[1].yPos;
    };
    Ship2.prototype.getTime = function (dis) {
        var a = dis * 20 / this.speed;
        return a - a % 100;
    };
    Ship2.prototype.getDistance = function (x, y) {
        var a = Math.abs(this.zeroX - x);
        var b = Math.abs(this.zeroY - y);
        var c = Math.pow(a, 2) + Math.pow(b, 2);
        return Math.sqrt(c);
    };
    /**点击伸出去抓*/
    Ship2.prototype.start = function () {
        this.changeline();
        // if (this.isCatch || this.tw1 == null)
        // {
        //     return;
        // }
        // // this.tw1.setPaused(true);
        // this.isCatch = true;
        // this.tw2 = null;
        // this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });
        // this.line.visible = true;
        // var r: number = this.rotation;
        // var hudu: number = r * Math.PI / 180;
        // var tag: number = Math.tan(hudu);
        // var w = tag * this.h;
        // var tarX: number = this.zeroX - w;
        // var tarY: number = this.h;
        // if (tarX < 50)
        // {
        //     tarX = 50;
        //     tarY = GameLogic.getInstance().GameStage_width / 2 / tag;
        // }
        // else if (tarX > GameLogic.getInstance().GameStage_width - 50)
        // {
        //     tarX = GameLogic.getInstance().GameStage_width - 50;
        //     tarY = -GameLogic.getInstance().GameStage_width / 2 / tag;
        // }
        // var time: number = this.getTime(this.getDistance(tarX, tarY));
        // this.tw2.to({ x: tarX, y: tarY }, time).wait(100).call(this.goBack,this);
    };
    Ship2.prototype.goBack = function () {
        this.catched = new egret.DisplayObjectContainer();
        this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });
        var time = this.getTime(this.getDistance(this.x, this.y));
        this.tw2.to({ x: this.zeroX, y: this.zeroY }, time).call(this.setScore, this);
    };
    Ship2.prototype.changeline = function () {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, 0xFF00FF);
        this.line.graphics.moveTo(this.zeroX, this.zeroY);
        this.line.graphics.lineTo(this.x, this.y);
        this.line.graphics.endFill();
    };
    Ship2.prototype.setScore = function () {
        if (this.catched != null && this.catched.parent != null) {
            this.catched.parent.removeChild(this.catched);
            // GameLogic.getInstance().game.addMonster(this.catchID);
            GameLogic.getInstance().sendGameData(new SendData('addMonster', { catchID: this.catchID, randomY: Math.random() * 300 + 240 }));
        }
        else {
            GameLogic.getInstance().sendGameData(new SendData('goOn', {}));
        }
        this.line.visible = false;
        this.catched = null;
    };
    Ship2.prototype.goOn = function () {
        this.isCatch = false;
        this.tw1.setPaused(false);
    };
    Ship2.prototype.clear = function () {
        egret.Tween.removeTweens(this);
        this.tw1 = null;
        this.tw2 = null;
        this.isCatch = false;
    };
    return Ship2;
}(eui.Component));
__reflect(Ship2.prototype, "Ship2");
//# sourceMappingURL=Ship2.js.map