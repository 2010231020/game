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

    public constructor(vo: MonsterVO) {
        super();
        this.vo = vo;

        this.init();
    }

    private init(): void {
        this.bg = new egret.Bitmap(RES.getRes(this.vo.image));
        this.addChild(this.bg);

        this.visible = false;
        this.play();
    }

    /**上上下下的动画s*/
    private play(): void {
        var tw = egret.Tween.get(this.bg);
        // tw.to({ y: -5 }, 1000).wait(200).to({ y: 5 }, 1000).call(this.play, this);
    }
    /**上上下下的动画s*/
    public toHook(ind: number): void {
        this.x = this.vo.xPos;
        this.y = this.vo.yPos;
        this.visible = true;
        if (ind == 0) {
            this.tarY = 110;
            this.tarX = 275;
        } else if (ind == 1) {
            this.tarY = 110;
            this.tarX = 690;
        }

        if (this.vo.swimDirection == 0) {
            this.skewY = 180;
        }

        var tw = egret.Tween.get(this);

        tw.to({ x: this.tarX, y: this.tarY }, Math.sqrt(Math.pow(this.x - this.tarX, 2) + Math.pow(this.y - this.tarY, 2)) / 80 * 1000);//鱼动画
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
