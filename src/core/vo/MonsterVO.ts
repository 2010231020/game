/**
 *
 * @author 
 *
 */
class MonsterVO {
	public constructor() {
	}
	public id: number;
	public image: string;

	/**当前屏幕出现的最多个数*/
	// public max_num:number;

	/**从哪里出现 0左侧 1右侧 中间*/
	// public left:number;

	/**纵向的位置 0中上 1底部*/
	// public pos:number;

	/**运动轨迹 0正常移动  1随机停顿  2斜线*/
	// public movetype:number;

	/**怪物冲左侧移动到右侧需要的时间*/
	public speedtime: number;

	/**重量，越重拉回来的速度越慢*/
	// public weight:number;

	/**得分*/
	public score: number;

	/**从哪里出现 0左侧 1右侧*/
	public swimDirection: number;

	/**速度*/
	public swimSpeed: number;

	/**X*/
	public xPos: number;

	/**Y*/
	public yPos: number;
	/**斜率*/
	public r: number;
	/**出钩状态*/
	public isThrowing: boolean;
	/**鱼的x坐标*/
	public ropeXPos;
	/**鱼的x坐标*/
	public ropeyPos;
}
