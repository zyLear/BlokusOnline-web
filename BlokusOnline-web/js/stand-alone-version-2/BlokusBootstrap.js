var webSocketClient;
var blokusUIController;
var networkManager;

function rotation() {
    blokusUIController.rotation();
}

function symmetry() {
    blokusUIController.symmetry();
}

function clickChooseChess(chessName) {
    blokusUIController.clickChooseChess(chessName);
}



function lose() {
    blokusUIController.lose(blokusUIController.blokusController.currentColor);
}

// function mouseUp(event) {
//
//
// }

function chessDown($this) {
    var x = $this.id.split('x')[0];
    var y = $this.id.split('x')[1];
    blokusUIController.chessDown(x, y);
}


$(function () {
    blokusUIController = new BlokusUIController();
    $(document).mouseup(function (event) {
        blokusUIController.mouseUp(event.pageX, event.pageY);

    });

    $(document).mousemove(function (event) {
        blokusUIController.moving(event.pageX, event.pageY);
    });

    networkManager = new NetworkManager(blokusUIController);

    webSocketClient = new WebSocketClient();

    // webSocketClient.connect();

});