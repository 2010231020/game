/**
 *
 * @author 
 *
 */
class ShipVO {
	public constructor() {
	}
	
	/**X*/
	public xPos:number;
	
	/**Y*/
	public yPos:number;

	public speed:number;
	/**得分*/
	public score:number;
	/**斜率*/
	public r:number;
	/**出钩状态:1出  0没出*/
	public  isThrowing:string;
	/**出钩方向：1出   -1收*/
	public  throwDirection:number;
	/**摆动方向：1右   -1左*/
	public  rollDirection:number;
	/**上钩的鱼的下标*/
	public  hookedFishType:number;
	/**记录钩中鱼的动画播放状态：true：播放中，false：未播放*/
	public  backMV:boolean;
}
