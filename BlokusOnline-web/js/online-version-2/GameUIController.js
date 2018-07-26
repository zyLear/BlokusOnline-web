function GameUIController() {

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