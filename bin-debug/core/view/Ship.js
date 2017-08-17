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
        _this.lineColor = 0xFF00FF;
        _this.skinName = "ShipSkin";
        return _this;
    }
    // kongbai
    Ship.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.zeroX = this.x;
        this.zeroY = this.y;
        this.line = new egret.Shape();
        this.parent.addChild(this.line);
    };
    Ship.prototype.setPos = function () {
        this.x = GameLogic.getInstance().shipData[0].xPos;
        this.y = GameLogic.getInstance().shipData[0].yPos;
        this.rotation = 90 - GameLogic.getInstance().shipData[0].r;
        this.changeline();
    };
    Ship.prototype.changeline = function () {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, this.lineColor);
        this.line.graphics.moveTo(this.zeroX, this.zeroY);
        this.line.graphics.lineTo(this.x, this.y);
        this.line.graphics.endFill();
    };
    return Ship;
}(eui.Component));
__reflect(Ship.prototype, "Ship");
//# sourceMappingURL=Ship.js.map