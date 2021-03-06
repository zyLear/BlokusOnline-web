function GameUIController() {

    this.sureLogin = function () {
        var account = $('#account').val();
        var password = $('#password').val();
        var msg = formLoginMsg(account, password);
        window.webSocketClient.sendMessage(msg);
    };

    this.sureCreateRoom = function () {
        // alert('df');
        var roomName = $('#create-room-name').val();
        if (roomName == '') {
            window.alert('房间名字不能为空！');
            return;
        }
        var gameType = this.tabController.roomList.twoPeople ? 2 : 1;
        var msg = formCreateRoomMsg(roomName, gameType);


        window.webSocketClient.sendMessage(msg, gameType);

        // this.updateRoomList([]);
        // this.tabController.show = 2
    };


    // this.app = new Vue({
    //     el: '#room-name',
    //     data: {
    //         message: "room name"

    //     }
    // });

    this.tabController = new Vue({
        el: '#page-main',
        data: {
            promptPanel: {
                showPrompt: false,
                promptMsg: ""
            },
            blokusPanel: {
                twoPeople: true
            },
            show: 4,
            roomList: {
                rooms: [],
                twoPeople: true
            },
            roomPlayersInfo: {
                items: [],
                roomName: ''
            },
            account: '',
            guestLoginVisible: false,
            guestAccount:''
        }, methods: {
            joinRoom: function (roomName) {
                let msg = formJoinRoomMsg(roomName);
                webSocketClient.sendMessage(msg);
            }, backToRoomListPanel: function () {
                let msg = formLeaveRoomMsg();
                webSocketClient.sendMessage(msg);
            }, backToRoomPanel: function () {
                blokusUIController.giveUp();
                blokusUIController.end();
                gameUIController.tabController.show = 2;
            }, giveUp: function () {
                blokusUIController.giveUp();
            }, logout: function () {
                let msg = formLogoutMsg();
                webSocketClient.sendMessage(msg);
                gameUIController.tabController.show = 4;
            }, chooseTwo: function (msg) {
                gameUIController.tabController.roomList.twoPeople = msg;
            }, sureGuestLogin: function () {
                let account = gameUIController.tabController.guestAccount;
                let message = formGuestLoginMsg(account);
                webSocketClient.sendMessage(message);
                gameUIController.tabController.guestLoginVisible = false

            }
        }


    });


    this.updateRoomList = function (obj) {

        this.tabController.roomList.rooms = obj;
    };

    this.updateRoomPlayersInfo = function (obj) {
        this.tabController.roomPlayersInfo.items = obj;
    };

    this.chooseColor = function (color) {
        var msg = formChooseColorMsg(color);
        window.webSocketClient.sendMessage(msg);
    };

    this.ready = function () {
        var msg = formReadyMsg();
        window.webSocketClient.sendMessage(msg);
    };

    this.showPromptMessage = function (msg) {
        this.tabController.promptPanel.promptMsg = msg;
        this.tabController.promptPanel.showPrompt = true;
    };

}