class RecData {
	public constructor(data: string) {
		let tmp = data.split(',');
		let leng = tmp.length;
		let hookDataRange = 7;
		this.leftHook = {
			isThrowing : tmp[leng - hookDataRange - 7],
			x: tmp[leng - hookDataRange - 6], y: tmp[leng - hookDataRange - 5],
			r: tmp[leng - hookDataRange - 4], score: tmp[leng - hookDataRange - 3],
			hasHooked: tmp[leng - hookDataRange - 2], hookedFishType: tmp[leng - hookDataRange - 1]
		};
		this.rightHook = {
			isThrowing : tmp[leng - 7],
			x: tmp[leng - 6], y: tmp[leng - 5],
			r: tmp[leng - 4], score: tmp[leng - 3],
			hasHooked: tmp[leng - 2], hookedFishType: tmp[leng - 1]
		};
		this.fishCount = +tmp[4];
		let tmpArr = [];
		for (let i = 0; i < +tmp[0]; i++) {
			let tmpObj = {
				x: tmp[i * 4 + 1],
				y: tmp[i * 4 + 2],
				type: tmp[i * 4 + 3],
				direction: tmp[i * 4 + 4]
			}
			tmpArr.push(tmpObj);
		}
		this.fishList = tmpArr;
	}
	public leftHook;
	public rightHook;
	public fishCount: number;
	public fishList: Object[];
}