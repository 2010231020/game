class SendData {
	public constructor(handler: number, gameAction: string) {
		let appId = GameLogic.appId;
		let userid = GameLogic.getInstance().userId;
		let roomId = GameLogic.getInstance().roomId;
		let ts = +new Date();
		let player = GameLogic.getInstance().player;
		let gameData = player + ',' + gameAction;
		this.sendStr =  Util.construct(appId, handler, userid, roomId, ts, gameData);
	}
	public sendStr: string;
}