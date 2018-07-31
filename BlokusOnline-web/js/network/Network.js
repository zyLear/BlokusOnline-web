var MsgType = new Object();
MsgType.CHECK_VERSION = 1;

MsgType.LOGIN = 2;

MsgType.CREATE_ROOM = 3;

MsgType.JOIN_ROOM = 4;

MsgType.LEAVE_ROOM = 5;

MsgType.READY = 6;

MsgType.CHESS_DONE = 7;

MsgType.UPDATE_ROOM_PLAYERS_INFO = 8;

MsgType.CHOOSE_COLOR = 9;

MsgType.START_BLOKUS = 10;

MsgType.START_BLOKUS_TWO_PEOPLE = 11;

MsgType.WIN = 12;

MsgType.LOSE = 13;

MsgType.GIVE_UP = 14;

MsgType.CHAT_IN_GAME = 15;

MsgType.ROOM_LIST = 16;

MsgType.REGISTER = 17;

MsgType.RANK_INFO = 18;

MsgType.PROFILE = 19;

MsgType.CHAT_IN_ROOM = 20;

MsgType.LEAVE_ROOM_FROM_GAME = 21;

MsgType.INIT_PLAYER_INFO_IN_GAME = 22;

MsgType.LOGOUT = 23;

MsgType.CREATE_ROOM_RESPONSE = 24;

MsgType.LOGIN_RESPONSE = 25;

MsgType.JOIN_ROOM_RESPONSE = 26;

MsgType.LEAVE_ROOM_RESPONSE = 27;

MsgType.REGISTER_RESPONSE = 28;


MsgType.PING = 10000;


function MessageBean(msgType, content) {
    this.msgType = msgType;
    this.content = content;
}


// var pingMsg = {
//     msgType: MsgType.PING,
//     connect: ''
// };
ping = function () {
    window.webSocketClient.webSocket.send('{"msgType":10000,"content":""}')

};

function WebSocketClient() {
    // this.networkManager = networkManager;
    this.webSocket = undefined;

    this.connect = function () {
        if (this.webSocket != undefined) {
            return;
        }

        this.webSocket = new WebSocket("ws://localhost:19090/blokus");

        this.webSocket.onopen = function () {
            //  alert("连接成功");
            console.log('connected');
            // gameUIController.tabController.show = 4;
            setInterval("ping()", 5000);
        };


        this.webSocket.onmessage = function (evt) {
            var received_msg = evt.data;
            // alert("数据已接收...");
            console.log("receive from server:" + received_msg);
            var obj = JSON.parse(received_msg);
            window.networkManager.handleMessage(obj);

        };

        this.webSocket.onclose = function () {
            // 关闭 websocket
            alert("连接已关闭...");
        };

        this.sendMessage = function (msg) {
            this.webSocket.send(JSON.stringify(msg));

        }


    };


}

function NetworkManager(gameUIController, blokusUIController) {
    this.gameUIController = gameUIController;
    this.blokusUIController = blokusUIController;

    this.handleMessage = function (messageBean) {
        var responses;
        switch (messageBean.msgType) {
            case MsgType.LOGIN_RESPONSE:
                this.loginResponse(messageBean);
                break;
            case MsgType.CREATE_ROOM_RESPONSE:
                this.roomResponse(messageBean);
                break;
            case MsgType.JOIN_ROOM_RESPONSE:
                this.roomResponse(messageBean);
                break;
            case MsgType.CHESS_DONE:
                responses = this.chessDone(messageBean);
                break;
            case MsgType.ROOM_LIST:
                this.updateRoomList(messageBean);
                break;
            case MsgType.UPDATE_ROOM_PLAYERS_INFO:
                this.updateRoomPlayersInfo(messageBean);
                break;
            case MsgType.START_BLOKUS:
                this.startBlokus(messageBean);
                break;
            case MsgType.GIVE_UP:
                this.giveUp(messageBean);
                break;
            case MsgType.LEAVE_ROOM_RESPONSE:
                this.leaveRoomResponse(messageBean);
                break;
        }


    };

    this.loginResponse = function (messageBean) {
        var object = JSON.parse(messageBean.content);
        if (object.errorCode == 0) {
            gameUIController.tabController.show = 3;
            window.webSocketClient.webSocket.send('{"msgType":16,"content":""}')
        } else {
            alert('login fail');
        }
    };

    this.roomResponse = function (messageBean) {
        var object = JSON.parse(messageBean.content);
        if (object.errorCode == 0) {
            this.gameUIController.tabController.roomPlayersInfo.roomName = object.roomName;
            this.gameUIController.tabController.show = 2;
        } else {
            alert('create room fail');
        }
    };


    this.chessDone = function (messageBean) {
        var object = JSON.parse(messageBean.content);
        this.blokusUIController.chessDone(object.x, object.y, object.model, object.chessName);
    };

    this.updateRoomList = function (messageBean) {
        var obj = JSON.parse(messageBean.content);
        this.gameUIController.updateRoomList(obj.roomItems);
    };

    this.updateRoomPlayersInfo = function (messageBean) {
        var obj = JSON.parse(messageBean.content);
        this.gameUIController.updateRoomPlayersInfo(obj.playerInfoMsgList);
    };

    this.startBlokus = function (messageBean) {
        var obj = JSON.parse(messageBean.content);
        var color = obj.color;
        var gameType = obj.gameType;
        if (gameType == 1) {
            MAX_PLAYERS_COUNT = 4;
            MAX_ROW_AND_COLUMN = 20;
            this.gameUIController.tabController.blokusPanel.twoPeople = false;
        } else {
            this.gameUIController.tabController.blokusPanel.twoPeople = true;
            MAX_PLAYERS_COUNT = 2;
            MAX_ROW_AND_COLUMN = 14;
        }
        this.blokusUIController.start(color);
        this.gameUIController.tabController.show = 1;
    };

    this.giveUp = function (messageBean) {
        var obj = JSON.parse(messageBean.content);
        var color = obj.color;
        this.blokusUIController.lose(color);
        this.gameUIController.showPromptMessage(color + ' lose！');
    };

    this.leaveRoomResponse = function (messageBean) {
        this.gameUIController.tabController.show = 3;
    }


}