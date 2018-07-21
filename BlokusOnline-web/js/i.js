// function test() {
//     alert('yes');
// }

function Chess(color ,model, rotationFlag, symmetryFlag) {
    this.color = color;
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



function initChooseChessByColor(color) {
    var model1 = new Array(5);
    model1[0] = [0, 0, 0, 0, 0];
    model1[1] = [0, 0, 1, 0, 0];
    model1[2] = [0, 1, 1, 1, 0];
    model1[3] = [0, 0, 1, 0, 0];
    model1[4] = [0, 0, 1, 0, 0];
    var chess1 = new Chess(color,model1, 0, 0);
    formChooseChess(chess1);

    var model2 = new Array(5);
    model2[0] = [0, 0, 0, 0, 0];
    model2[1] = [0, 0, 0, 0, 0];
    model2[2] = [0, 1, 1, 1, 0];
    model2[3] = [0, 0, 1, 0, 0];
    model2[4] = [0, 0, 0, 0, 0];
    var chess2 = new Chess(color,model2, 0, 0);
    formChooseChess(chess2);

    var model3 = new Array(5);
    model3[0] = [0, 0, 0, 0, 0];
    model3[1] = [0, 0, 1, 0, 0];
    model3[2] = [0, 1, 1, 0, 0];
    model3[3] = [0, 0, 1, 0, 0];
    model3[4] = [0, 0, 0, 0, 0];
    var chess3 = new Chess(color,model3, 0, 0);
    formChooseChess(chess3);

    var model4 = new Array(5);
    model4[0] = [0, 0, 0, 0, 0];
    model4[1] = [0, 0, 1, 0, 0];
    model4[2] = [0, 1, 1, 0, 0];
    model4[3] = [0, 0, 1, 0, 0];
    model4[4] = [0, 0, 0, 0, 0];
    var chess4 = new Chess(color,model4, 0, 0);
    formChooseChess(chess4);
}

$(function () {
    //网页加载完调用的方法
    initChessBoard();
    initChooseChessByColor(1);

});

