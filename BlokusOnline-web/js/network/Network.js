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


function MessageBean(msgType, content) {
    this.msgType = msgType;
    this.content = content;
}

function WebSocketClient(networkManager) {
    this.networkManager = networkManager;


}

function NetworkManager(gameUIController, blokusUIController) {
    this.gameUIController = gameUIController;
    this.blokusUIController = blokusUIController;

    this.handleMessage = function (messageBean) {
        switch (messageBean.msgType) {
            case MsgType.CHESS_DONE:
                return this.chessDone(messageBean);
        }
    };

    this.chessDone = function (messageBean) {
        var object = JSON.parse(messageBean.content);
        object.x
    };


}