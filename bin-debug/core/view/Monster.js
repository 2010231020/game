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
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(vo) {
        var _this = _super.call(this) || this;
        _this.vo = vo;
        _this.init();
        return _this;
    }
    Monster.prototype.init = function () {
        this.bg = new egret.Bitmap(RES.getRes(this.vo.image));
        this.addChild(this.bg);
        this.visible = false;
        this.play();
    };
    /**上上下下的动画s*/
    Monster.prototype.play = function () {
        var tw = egret.Tween.get(this.bg);
        // tw.to({ y: -5 }, 1000).wait(200).to({ y: 5 }, 1000).call(this.play, this);
    };
    Monster.prototype.start = function () {
        // this.birthX = 0;
        // this.tarX = GameLogic.getInstance().GameStage_width;
        // this.tarY = this.y;
        // this.x = this.birthX;
        this.x = this.vo.xPos;
        this.y = this.vo.yPos;
        this.tarY = this.y;
        this.visible = true;
        var tw = egret.Tween.get(this);
        if (this.vo.swimDirection == 0) {
            this.tarX = this.x + this.vo.swimSpeed * 20;
            tw.to({ x: this.tarX, y: this.tarY }, 2000);
        }
        else if (this.vo.swimDirection == 1) {
            this.tarX = this.x - this.vo.swimSpeed * 20;
            tw.to({ x: this.tarX, y: this.tarY }, 2000);
        }
    };
    Monster.prototype.moveOver = function () {
        this.start();
    };
    Monster.prototype.clear = function () {
        egret.Tween.removeTweens(this);
    };
    return Monster;
}(egret.Sprite));
__reflect(Monster.prototype, "Monster");
//# sourceMappingURL=Monster.js.map