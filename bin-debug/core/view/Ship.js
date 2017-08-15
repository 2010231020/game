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
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship() {
        var _this = _super.call(this) || this;
        _this.catchID = -1;
        _this.h = 540;
        _this.r = 70;
        _this.go = false;
        _this.speed = 3;
        _this.player = 1;
        _this.skinName = "ShipSkin";
        return _this;
    }
    Ship.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.zeroX = this.x;
        this.zeroY = this.y;
        this.line = new egret.Shape();
        this.parent.addChild(this.line);
        this.prepareStart();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catchIt, this);
    };
    /**抓到东西*/
    Ship.prototype.catchIt = function (sth) {
        this.tw2.setPaused(true);
        this.catched = sth;
        this.catched.x = (40 - sth.width) / 2;
        this.catched.y = 36;
        console.log(sth.vo);
        this.catchID = sth.vo.id;
        sth.clear();
        this.addChild(sth);
        var time = this.getTime(this.getDistance(this.x, this.y));
        this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });
        this.tw2.to({ x: this.zeroX, y: this.zeroY }, time).call(this.setScore, this);
    };
    Ship.prototype.prepareStart = function () {
        this.isCatch = false;
        // this.tw1 = egret.Tween.get(this, { loop: true });
        // this.rotation = this.r;
        // this.tw1.to({ rotation: -this.r }, 3000).wait(100).to({ rotation: this.r }, 3000);
        this.x = GameLogic.getInstance().shipData[0].xPos;
        this.y = GameLogic.getInstance().shipData[0].yPos;
    };
    Ship.prototype.setPos = function () {
        this.x = GameLogic.getInstance().shipData[0].xPos;
        this.y = GameLogic.getInstance().shipData[0].yPos;
    };
    Ship.prototype.getTime = function (dis) {
        var a = dis * 20 / this.speed;
        return a - a % 100;
    };
    Ship.prototype.getDistance = function (x, y) {
        var a = Math.abs(this.zeroX - x);
        var b = Math.abs(this.zeroY - y);
        var c = Math.pow(a, 2) + Math.pow(b, 2);
        return Math.sqrt(c);
    };
    /**点击伸出去抓*/
    Ship.prototype.start = function () {
        if (this.isCatch || this.tw1 == null) {
            return;
        }
        this.tw1.setPaused(true);
        this.isCatch = true;
        this.tw2 = null;
        this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });
        this.line.visible = true;
        var r = this.rotation; //斜率
        var hudu = r * Math.PI / 180;
        var tag = Math.tan(hudu);
        var w = tag * this.h;
        var tarX = this.zeroX - w;
        var tarY = this.h;
        if (tarX < 50) {
            tarX = 50;
        }
        else if (tarX > GameLogic.getInstance().GameStage_width - 50) {
            tarX = GameLogic.getInstance().GameStage_width - 50;
            tarY = -GameLogic.getInstance().GameStage_width / 2 / tag;
        }
        var time = this.getTime(this.getDistance(tarX, tarY));
        //算出终点，未碰到任何物体停顿100ms直接返回
        this.tw2.to({ x: tarX, y: tarY }, time).wait(100).call(this.goBack, this);
    };
    Ship.prototype.goBack = function () {
        this.catched = new egret.DisplayObjectContainer();
        this.tw2 = egret.Tween.get(this, { onChange: this.changeline, onChangeObj: this });
        var time = this.getTime(this.getDistance(this.x, this.y));
        this.tw2.to({ x: this.zeroX, y: this.zeroY }, time).call(this.setScore, this);
    };
    Ship.prototype.changeline = function () {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, 0xFF00FF);
        this.line.graphics.moveTo(this.zeroX, this.zeroY);
        this.line.graphics.lineTo(this.x, this.y);
        this.line.graphics.endFill();
        if (GameLogic.getInstance().game != null && this.catched == null) {
            GameLogic.getInstance().game.checkCatch(this.player);
        }
    };
    Ship.prototype.setScore = function () {
        if (this.catched != null && this.catched.parent != null) {
            this.catched.parent.removeChild(this.catched);
            GameLogic.getInstance().sendGameData(new SendData('addMonster', { catchID: this.catchID, randomY: Math.random() * 300 + 240 }));
        }
        else {
            GameLogic.getInstance().sendGameData(new SendData('goOn', {}));
        }
        this.line.visible = false;
        this.catched = null;
    };
    Ship.prototype.goOn = function () {
        this.isCatch = false;
        this.tw1.setPaused(false);
    };
    Ship.prototype.clear = function () {
        egret.Tween.removeTweens(this);
        this.tw1 = null;
        this.tw2 = null;
        this.isCatch = false;
    };
    return Ship;
}(eui.Component));
__reflect(Ship.prototype, "Ship");
//# sourceMappingURL=Ship.js.map