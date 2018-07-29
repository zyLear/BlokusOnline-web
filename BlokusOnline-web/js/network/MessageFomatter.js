function formLoginMsg(account, password) {
    var msg = new Object();
    msg.msgType = MsgType.LOGIN;
    var obj = new Object();
    obj.account = account;
    obj.password = password;
    msg.content = JSON.stringify(obj);
    return msg;
}

function formCreateRoomMsg(roomName, gameType) {
    var msg = new Object();
    msg.msgType = MsgType.CREATE_ROOM;
    var obj = new Object();
    obj.roomName = roomName;
    obj.gameType = gameType;
    msg.content = JSON.stringify(obj);
    return msg;
}

function formJoinRoomMsg(roomName) {
    var msg = new Object();
    msg.msgType = MsgType.JOIN_ROOM;
    var obj = new Object();
    obj.roomName = roomName;
    msg.content = JSON.stringify(obj);
    return msg;
}

function formChooseColorMsg(color) {
    var msg = new Object();
    msg.msgType = MsgType.CHOOSE_COLOR;
    var obj = new Object();
    obj.color = color;
    msg.content = JSON.stringify(obj);
    return msg;
}

function formReadyMsg() {
    var msg = new Object();
    msg.msgType = MsgType.READY;
    return msg;
}

function formChessDoneMsg(x, y, model, chessName) {
    var msg = new Object();
    msg.msgType = MsgType.CHESS_DONE;
    var obj = new Object();
    obj.x = x;
    obj.y = y;
    obj.model = model;
    obj.chessName = chessName;
    msg.content = JSON.stringify(obj);
    return msg;
}

function formGiveUpMsg(color) {
    var msg = new Object();
    msg.msgType = MsgType.GIVE_UP;
    var obj = new Object();
    obj.color = color;
    msg.content = JSON.stringify(obj);
    return msg;
}

function formLeaveRoomMsg() {
    var msg = new Object();
    msg.msgType = MsgType.LEAVE_ROOM;
    return msg;
}

function formLogoutMsg() {
    var msg = new Object();
    msg.msgType = MsgType.LOGOUT;
    return msg;
}