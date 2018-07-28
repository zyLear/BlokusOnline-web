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

        var msg = formCreateRoomMsg(roomName);


        window.webSocketClient.sendMessage(msg);

        // this.updateRoomList([]);
        // this.tabController.show = 2
    };


    this.app = new Vue({
        el: '#room-name',
        data: {
            message: "room name"
        }
    });

    this.tabController = new Vue({
        el: 'body',
        data: {
            show: 4,
            roomList: {
                rooms: []
            },
            roomPlayersInfo: {
                items: []
            }
        },
        methods:{
            joinRoom:function (roomName) {
                var msg = formJoinRoomMsg(roomName);
                window.webSocketClient.sendMessage(msg);
            }
        }



    });



    this.updateRoomList = function (obj) {

        this.tabController.roomList.rooms = obj;
    };

    this.updateRoomPlayersInfo = function (obj) {
        this.tabController.roomPlayersInfo.items = obj;
    };

    this.chooseColor = function (color){
        var msg = formChooseColorMsg(color);
        window.webSocketClient.sendMessage(msg);
    };

    this.ready = function (){
        var msg = formReadyMsg();
        window.webSocketClient.sendMessage(msg);
    };


}