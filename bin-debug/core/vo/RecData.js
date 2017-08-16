var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RecData = (function () {
    function RecData(data) {
        var tmp = data.split(',');
        var leng = tmp.length;
        var hookDataRange = 7;
        this.leftHook = {
            isThrowing: tmp[leng - hookDataRange - 6],
            x: tmp[leng - hookDataRange - 6], y: tmp[leng - hookDataRange - 5],
            r: tmp[leng - hookDataRange - 4], score: tmp[leng - hookDataRange - 3],
            hasHooked: tmp[leng - hookDataRange - 2], hookedFishType: tmp[leng - hookDataRange - 1]
        };
        this.rightHook = {
            isThrowing: tmp[leng - 6],
            x: tmp[leng - 6], y: tmp[leng - 5],
            r: tmp[leng - 4], score: tmp[leng - 3],
            hasHooked: tmp[leng - 2], hookedFishType: tmp[leng - 1]
        };
        this.fishCount = +tmp[4];
        var tmpArr = [];
        for (var i = 0; i < +tmp[0]; i++) {
            var tmpObj = {
                x: tmp[i * 4 + 1],
                y: tmp[i * 4 + 2],
                type: tmp[i * 4 + 3],
                direction: tmp[i * 4 + 4]
            };
            tmpArr.push(tmpObj);
        }
        this.fishList = tmpArr;
    }
    return RecData;
}());
__reflect(RecData.prototype, "RecData");
//# sourceMappingURL=RecData.js.map