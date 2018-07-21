// function test() {
//     alert('yes');
// }

function Chess(model, rotationFlag, symmetryFlag) {
    this.model = model;
    this.rotationFlag = rotationFlag;
    this.symmetryFlag = symmetryFlag;
}


function chessDown($this) {
    // alert($this.id);
    // alert($this);
    $($this).html('<div class="chess"></div>');

}


function initChessBoard() {
    var chessboard = $('.chessboard');


    var sign = 4;
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            var chess = $('<div  class="chess-box" onclick="chessDown(this)"></div>');
            if (sign > 0) {
                chess.html('<div class="chess"></div>');
                sign--;
            }
            var id = i + ',' + j;
            chess.attr('id', id);
            chessboard.append(chess);
        }
    }
}


function formChooseChess(chess) {
    var contentRight = $('.content-right');
    var chooseChess = $('<div class="choose-chess"></div>');
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (chess.model[i][j] == 1) {
                chooseChess.append('<div  class="chess-box"> <div class="chess"></div></div>')
            } else {
                chooseChess.append('<div  class="chess-box"> </div>');
            }
        }
    }
    contentRight.append(chooseChess);



}

$(function () {
    initChessBoard();


    var model = new Array(5);
    model[0] = [0, 0, 0, 0, 0];
    model[1] = [0, 0, 1, 0, 0];
    model[2] = [0, 1, 1, 1, 0];
    model[3] = [0, 0, 1, 0, 0];
    model[4] = [0, 0, 0, 0, 0];
    var chess = new Chess(model, 0, 0);
    formChooseChess(chess);
});

