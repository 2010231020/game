/**
 *
 * @author 
 *
 */
class Ship extends eui.Component {
    private line: egret.Shape;
    private zeroX: number;
    private zeroY: number;
    private catchID: number = -1;
    private catched: egret.DisplayObjectContainer;
    /**摇摆动画*/
    private tw1: egret.Tween;
    /**抓怪动画*/
    private tw2: egret.Tween;
    private isCatch: boolean;
    /**摆动顶点度数*/
    private zeroR: number = 75;
    private judge: boolean = true;
    private lineColor: number = 0xcecece;
    public constructor() {
        super();
        this.skinName = "ShipSkin";
    }
    // kongbai
    protected childrenCreated(): void {
        super.childrenCreated();
        this.zeroX = this.x;
        // console.log(this.x,this.y);
        this.zeroY = this.y;
        this.line = new egret.Shape();
        this.parent.addChild(this.line);
    }

    public setPos(): void {
        this.x = +GameLogic.getInstance().shipData[0].xPos;
        this.y = +GameLogic.getInstance().shipData[0].yPos;
        console.log(GameLogic.getInstance().shipData[0].yPos, GameLogic.getInstance().shipData[0].xPos)
        // this.x = GameLogic.getInstance().shipData[0].xPos;
        // this.y = GameLogic.getInstance().shipData[0].yPos;
        this.rotation = 90 - GameLogic.getInstance().shipData[0].r;
        // console.log(this.rotation);
        // console.log(GameLogic.getInstance().shipData[0].isThrowing)
        // console.log(GameLogic.getInstance().shipData[0].throwDirection);//throwDirection
        // console.log(this.rotation)
        if (GameLogic.getInstance().shipData[0].isThrowing == "0") {
            egret.Tween.removeTweens(this);
            this.tw1 = null;
            this.tw1 = egret.Tween.get(this);
            if (GameLogic.getInstance().shipData[0].rollDirection == 1) {
                if (this.rotation - 100 > -this.zeroR) {
                    this.tw1.to({ rotation: this.rotation - 100 }, 2000);
                } else {
                    // console.log((this.rotation - (-this.zeroR)) / 50 * 1000);
                    this.tw1.to({ rotation: -this.zeroR }, (-this.zeroR - this.rotation) / -50 * 1000).to({ rotation: -this.zeroR + (100 - Math.abs(-this.zeroR - this.rotation)) }, 2000 - ((this.rotation - (-this.zeroR)) / 50 * 1000));
                }
            } else {
                if (this.rotation + 100 < this.zeroR) {
                    this.tw1.to({ rotation: this.rotation + 100 }, 2000);
                } else {
                    this.tw1.to({ rotation: this.zeroR }, (this.zeroR - this.rotation) / 50 * 1000).to({ rotation: this.zeroR - (100 - Math.abs(this.zeroR - this.rotation)) }, 2000 - (this.zeroR - this.rotation) / 50 * 1000);
                }
            }
        } else {
            egret.Tween.removeTweens(this);
            // console.log(this.x, this.y, this.x + 80 * Math.sin(this.rotation), this.y + 80 * Math.abs(Math.cos(this.rotation)));
            // console.log(GameLogic.getInstance().shipData[1].throwDirection);
            this.tw2 = null;
            this.tw2 = egret.Tween.get(this);
            this.tw2.to({ x: this.x - 80 * Math.sin(this.rotation / 180 * Math.PI) * GameLogic.getInstance().shipData[0].throwDirection, y: this.y + 80 * Math.abs(Math.cos(this.rotation / 180 * Math.PI)) * GameLogic.getInstance().shipData[0].throwDirection }, 1000);
            
        }
        this.changeline();
    }

    private changeline(): void {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, this.lineColor);
        this.line.graphics.moveTo(this.zeroX, this.zeroY);
        this.line.graphics.lineTo(this.x - 16 * Math.sin(this.rotation / 180 * Math.PI), this.y + 16 * Math.abs(Math.cos(this.rotation / 180 * Math.PI)));
        this.line.graphics.endFill();
        if (GameLogic.getInstance().shipData[0].isThrowing == "0") {
            this.line.graphics.clear();
        }
    }
}
