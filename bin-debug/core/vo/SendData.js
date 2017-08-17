var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SendData = (function () {
    function SendData(handler, gameAction) {
        var appId = GameLogic.appId;
        var userid = GameLogic.getInstance().userId;
        var roomId = GameLogic.getInstance().roomId;
        var ts = +new Date();
        var player = GameLogic.getInstance().player;
        var gameData = player + ',' + gameAction;
        this.sendStr = Util.construct(appId, handler, userid, roomId, ts, gameData);
    }
    return SendData;
}());
__reflect(SendData.prototype, "SendData");
//# sourceMappingURL=SendData.js.map