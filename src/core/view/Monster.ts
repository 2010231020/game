/**
 *
 * @author 
 *
 */
class Monster extends egret.Sprite {
    private bg: egret.Bitmap;

    public vo: MonsterVO;
    private birthX: number;
    private birthY: number;
    private tarX: number;
    private tarY: number;
    private tw: egret.Tween;

    public constructor(vo: MonsterVO) {
        super();
        this.vo = vo;

        this.init();
    }

    private init(): void {
        this.bg = new egret.Bitmap(RES.getRes(this.vo.image));
        this.addChild(this.bg);

        this.visible = false;
        // this.play();
    }

    /**上上下下的动画s*/
    private play(): void {
        // var tw = egret.Tween.get(this.bg);
        // tw.to({ y: -5 }, 1000).wait(200).to({ y: 5 }, 1000).call(this.play, this);
    }
    /**钩住后*/
    public toHook(ind: number): void {
        egret.Tween.removeTweens(this);
        var that = this;
        this.x = this.vo.xPos;
        this.y = this.vo.yPos;
        this.visible = true;
        if (ind == 0) {
            this.tarX = +this.x + (275 - +GameLogic.getInstance().shipData[0].xPos);
            this.tarY = +this.y + (110 - +GameLogic.getInstance().shipData[0].yPos);
        } else if (ind == 1) {
            this.tarX = +this.x + (690 - +GameLogic.getInstance().shipData[1].xPos);
            this.tarY = +this.y + (110 - +GameLogic.getInstance().shipData[1].yPos);
        }
        console.log(this.vo.swimDirection);
        if (this.vo.swimDirection == 0) {
            this.skewY = 180;//鱼反向；
            this.x = this.x + RES.getRes("mission_json")[this.vo.id]["width"]
            
        }
        this.tw = egret.Tween.get(this);
        // console.log(this.x, this.y, this.tarX, this.tarY, Math.sqrt(Math.pow(this.x - this.tarX, 2) + Math.pow(this.y - this.tarY, 2)) / 80 * 1000);
        this.tw.to({ x: this.tarX, y: this.tarY }, Math.sqrt(Math.pow(this.x - this.tarX, 2) + Math.pow(this.y - this.tarY, 2)) / 80 * 1000).call(function(){
            that.parent.removeChild(that);
        });//鱼动画
    }

    public start(): void {
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
            this.skewY = 180;
            this.x = this.vo.xPos + RES.getRes("mission_json")[this.vo.id]["width"];
            // console.log(RES.getRes("mission_json")[this.vo.id]["width"]);
            this.tarX = this.x + this.vo.swimSpeed * 20;
            tw.to({ x: this.tarX, y: this.tarY }, 2000);
        } else if (this.vo.swimDirection == 1) {
            this.tarX = this.x - this.vo.swimSpeed * 20;
            tw.to({ x: this.tarX, y: this.tarY }, 2000);//鱼动画
        }
    }

    private moveOver(): void {
        this.start();
    }

    public clear(): void {
        egret.Tween.removeTweens(this);
    }
}
