// function test() {
//     alert('yes');
// }

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
            if (sign>0) {
                chess.html('<div class="chess"></div>');
                sign--;
            }
            var id = i + ',' + j;
            chess.attr('id', id);
            chessboard.append(chess);
        }
    }

}

$(function () {
    initChessBoard();
});

