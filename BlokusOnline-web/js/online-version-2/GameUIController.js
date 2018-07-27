function GameUIController() {


    this.sureCreateRoom = function () {
        // var roomName = $('#create-room-name').val();
        //
        // var obj = new Object();
        // obj.msgType = MsgType.CREATE_ROOM;
        // var msg = new Object();
        // msg.roomName = roomName;
        // msg.gameType = 1;
        // obj.content = JSON.stringify(msg);
        // window.webSocketClient.sendMessage(obj);

        // console.log('sss');

        this.updateRoomList([]);
        // this.tabController.show = 2
    };


    this.app = new Vue({
        el: '#room-name',
        data: {
            message: "room name"
        }
    });

    // this.tabController = new Vue({
    //     el: '#page-main',
    //     data: {
    //         show: 3
    //     }
    // });

    this.roomPlayersInfo = new Vue({
        el: '#roomPlayersInfo',
        data: {
            items: [
                {
                    account: "1",
                    color: "sdf",
                    isReady: "23"
                }, {
                    account: "2",
                    color: "rtr",
                    isReady: "2r3"
                }, {
                    account: "2",
                    color: "rtr",
                    isReady: "2r3"
                }, {
                    account: "2",
                    color: "rtr",
                    isReady: "2r3"
                }
            ]
        }
    });


    this.roomList = new Vue({
        el: '#room-list',
        data: {
            rooms: [
                {
                    roomName: 'aanna',
                    maxPlayerCount: 2,
                    roomStatus: 'kai',
                    currentPlayerCount: 1
                }, {
                    roomName: 'aanna',
                    maxPlayerCount: 4,
                    roomStatus: 'kai',
                    currentPlayerCount: 3
                }, {
                    roomName: 'aanna',
                    maxPlayerCount: 4,
                    roomStatus: 'kai',
                    currentPlayerCount: 3
                }
            ]
        }
    });

    this.updateRoomList = function (obj) {

        var aa = [
            {
                roomName: '232',
                maxPlayerCount: 2,
                roomStatus: 'kai',
                currentPlayerCount: 1
            }, {
                roomName: '32',
                maxPlayerCount: 4,
                roomStatus: 'kai',
                currentPlayerCount: 3
            }, {
                roomName: '123444',
                maxPlayerCount: 4,
                roomStatus: 'kai',
                currentPlayerCount: 3
            }
        ];
        // var obj = JSON.parse(content);
        this.roomList.rooms = obj;
    };

    this.updateRoomPlayersInfo = function (obj) {
        this.roomPlayersInfo.items = obj;
    };


}