var webSocketClient;
var blokusUIController;
var networkManager;
var gameUIController;

function rotation() {
    blokusUIController.rotation();
}

function symmetry() {
    blokusUIController.symmetry();
}

function clickChooseChess(chessName, event) {
    // alert(event.x+' s '+ event.y);
    blokusUIController.clickChooseChess(chessName, event);
}

//
// function lose() {
//     blokusUIController.giveUp();
// }

function sureCreateRoom() {

    gameUIController.sureCreateRoom();
}

function sureLogin() {
    gameUIController.sureLogin();
}

function chooseColor(color) {
    gameUIController.chooseColor(color);
}

function ready() {
    gameUIController.ready();
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
    gameUIController = new GameUIController();


    $(document).click(function () {
        gameUIController.tabController.promptPanel.showPrompt = false;
    });

    networkManager = new NetworkManager(gameUIController, blokusUIController);

    webSocketClient = new WebSocketClient();

    webSocketClient.connect();


});
