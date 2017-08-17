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
    private lineColor: number=0xFF00FF;
    public constructor() {
        super();
        this.skinName = "ShipSkin";
    }
// kongbai
    protected childrenCreated(): void {
        super.childrenCreated();
        this.zeroX = this.x;
        this.zeroY = this.y;
        this.line = new egret.Shape();
        this.parent.addChild(this.line);
    }

    public setPos(): void{
        this.x = GameLogic.getInstance().shipData[0].xPos;
        this.y = GameLogic.getInstance().shipData[0].yPos;
        this.rotation=90-GameLogic.getInstance().shipData[0].r;
        this.changeline();
    }

    private changeline(): void {
        this.line.graphics.clear();
        this.line.graphics.lineStyle(2, this.lineColor);
        this.line.graphics.moveTo(this.zeroX, this.zeroY);
        this.line.graphics.lineTo(this.x, this.y);
        this.line.graphics.endFill();
    }
}
