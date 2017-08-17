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
        _this.lineColor = 0xFF00FF;
        _this.skinName = "ShipSkin2";
        return _this;
    }
    // kongbai
    Ship2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.zeroX = this.x;
        this.zeroY = this.y;
        this.line = new egret.Shape();
        this.parent.addChild(this.line);
    };
    Ship2.prototype.setPos = function () {
        this.x = GameLogic.getInstance().shipData[1].xPos;
        this.y = GameLogic.getInstance().shipData[1].yPos;
        this.rotation = 90 - GameLogic.getInstance().shipData[1].r;
        this.changeline();
    };
    Ship2.prototype.changeline = function () {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, this.lineColor);
        this.line.graphics.moveTo(this.zeroX, this.zeroY);
        this.line.graphics.lineTo(this.x, this.y);
        this.line.graphics.endFill();
    };
    return Ship2;
}(eui.Component));
__reflect(Ship2.prototype, "Ship2");
//# sourceMappingURL=Ship2.js.map