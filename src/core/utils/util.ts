/**
 *
 * @author 
 *
 */
class Util {
	public constructor() {
	}
	public static construct(appId, handler: number, uid: number, roomId, ts: number, gd: any): string {
		return appId + '|' + handler + '|' + uid + '|'
			+ roomId + '|' + ts + '|' + encodeURI(gd);
	}
	public static deconstruct(msg: string): Object {
		let arr = msg.split('|');
		let tmp = decodeURI(arr[5]).split(',');
		let leng = tmp.length;
		let hookDataRange = 7;
		let leftHook = {
			isThrowing: tmp[leng - hookDataRange - 7],
			x: tmp[leng - hookDataRange - 6], y: tmp[leng - hookDataRange - 5],
			r: tmp[leng - hookDataRange - 4], score: tmp[leng - hookDataRange - 3],
			hasHooked: tmp[leng - hookDataRange - 2], hookedFishType: tmp[leng - hookDataRange - 1]
		};
		let rightHook = {
			isThrowing: tmp[leng - 7],
			x: tmp[leng - 6], y: tmp[leng - 5],
			r: tmp[leng - 4], score: tmp[leng - 3],
			hasHooked: tmp[leng - 2], hookedFishType: tmp[leng - 1]
		};
		let fishCount = +tmp[4];
		let tmpArr = [];
		for (let i = 0; i < +tmp[1]; i++) {
			let tmpObj = {
				x: tmp[i * 4 + 2],
				y: tmp[i * 4 + 3],
				type: tmp[i * 4 + 4],
				direction: tmp[i * 4 + 5]
			}
			tmpArr.push(tmpObj);
		}
		let fishList = tmpArr;

		return {
			appId: arr[0],
			handler: arr[1],
			uid: arr[2],
			roomId: arr[3],
			ts: arr[4],
			gd: {
				type: tmp[0],
				leftHook: leftHook,
				rightHook: rightHook,
				fishCount: fishCount,
				fishList: fishList
			}
		};
	}

	public static CHECK_USER: number = 0;
	public static LEAVE_ROOM: number = 13;
	public static SEND_MESSAGE: number = 21;
	public static sendMsg(handler: number, gameAction: string): string {
		let appId = GameLogic.appId;
		let userid = GameLogic.getInstance().userId;
		let roomId = GameLogic.getInstance().roomId;
		let ts = +new Date();
		let player = GameLogic.getInstance().player;
		let gameData = player + ',' + gameAction;
		return this.construct(appId, handler, userid, roomId, ts, gameData);
	}
}
