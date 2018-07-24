var blokusUIController;


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

function chessDown($this) {
    var x = $this.id.split('x')[0];
    var y = $this.id.split('x')[1];
    blokusUIController.chessDown(x, y);
}


$(function () {
    blokusUIController = new BlokusUIController();
});