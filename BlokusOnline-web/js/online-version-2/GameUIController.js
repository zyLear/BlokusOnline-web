function GameUIController() {


    this.sureCreateRoom = function () {
        var roomName = $('#create-room-name').val();

        var obj = new Object();
        obj.msgType = MsgType.CREATE_ROOM;
        var msg = new Object();
        msg.roomName = roomName;
        msg.gameType = 1;
        obj.content = JSON.stringify(msg);
        window.webSocketClient.sendMessage(obj);
    };


    this.app = new Vue({
        el: '#room-name',
        data: {
            message: "room name"
        }
    });


    this.roomList = new Vue({
        el: '#room-list',
        data: {
            rooms: [
                {
                    roomName: 'aanna',
                    maxPlayers: 2,
                    roomStatus: 'kai',
                    currentPlayers: 1
                }, {
                    roomName: 'aanna',
                    maxPlayers: 4,
                    roomStatus: 'kai',
                    currentPlayers: 3
                }, {
                    roomName: 'aanna',
                    maxPlayers: 4,
                    roomStatus: 'kai',
                    currentPlayers: 3
                }
            ]
        }
    })


}