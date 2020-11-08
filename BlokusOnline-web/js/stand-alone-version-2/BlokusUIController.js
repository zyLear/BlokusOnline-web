// function test() {
//     alert('yes');
// }


function BlokusUIController() {


    this.formChooseChess = function (chess) {
        var contentRight = $('.content-right-' + chess.color);

        var symmetryNode = $('<div id="symmetry' + chess.name + '"  ></div>');

        var rotationNode = $('<div id="rotation' + chess.name + '" onmousedown="clickChooseChess(\'' + chess.name + '\')"></div>');

        var emptyDiv = $('<div id="chooseButton' + chess.name + '" class="choose-chess-button" ></div>');

        var doubleWidthDiv = $('<div style="width: 422px;" ></div>');
        //
        var backDiv = $('<div class="chess-choose-box" style="float: left"></div>'); //float: left

        // var frontDiv = $('<div id="front' + chess.name + '" class="choose-chess-button-relative"></div>');

        var relativeDiv = $('<div class="choose-chess-button-relative"></div>');

        var combineDiv = $('<div id="combine' + chess.name + '" ></div>');

        var frontChessDiv = $('<div class="chess-choose-box"></div>');


        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (chess.model[i][j] == 1) {
                    backDiv.append('<div  class="chess-box" > </div>');
                    frontChessDiv.append('<div  class="chess-box-hide" > <div class="chess-' + chess.color + '"></div></div>');
                } else {
                    backDiv.append('<div  class="chess-box"> </div>');
                    frontChessDiv.append('<div  class="chess-box-hide"> </div>');
                }
            }
        }


        rotationNode.append(frontChessDiv);
        symmetryNode.append(rotationNode);
        combineDiv.append(symmetryNode);


        doubleWidthDiv.append(backDiv);
        doubleWidthDiv.append(relativeDiv);
        relativeDiv.append(combineDiv);


        emptyDiv.append(doubleWidthDiv);
        contentRight.append(emptyDiv);
    };

    this.initChooseChessByColor = function (chessMap, color) {

        var model1 = new Array(5);
        model1[0] = [0, 0, 0, 0, 0];
        model1[1] = [0, 0, 0, 0, 0];
        model1[2] = [0, 1, 1, 1, 0];
        model1[3] = [0, 0, 1, 0, 0];
        model1[4] = [0, 0, 0, 0, 0];
        var name1 = color + '_' + 1;
        var chess1 = new Chess(name1, color, model1, 0, 0);
        this.formChooseChess(chess1);
        chessMap.set(name1, chess1);

        var model2 = new Array(5);
        model2[0] = [0, 0, 0, 0, 0];
        model2[1] = [0, 0, 1, 0, 0];
        model2[2] = [0, 1, 1, 1, 0];
        model2[3] = [0, 0, 1, 0, 0];
        model2[4] = [0, 0, 0, 0, 0];
        var name2 = color + '_' + 2;
        var chess2 = new Chess(name2, color, model2, 0, 0);
        this.formChooseChess(chess2);
        chessMap.set(name2, chess2);

        var model3 = new Array(5);
        model3[0] = [0, 0, 0, 0, 0];
        model3[1] = [0, 0, 1, 0, 0];
        model3[2] = [0, 1, 1, 0, 0];
        model3[3] = [0, 0, 0, 0, 0];
        model3[4] = [0, 0, 0, 0, 0];
        var name3 = color + '_' + 3;
        var chess3 = new Chess(name3, color, model3, 0, 0);
        this.formChooseChess(chess3);
        chessMap.set(name3, chess3);

        var model4 = new Array(5);
        model4[0] = [0, 0, 0, 0, 0];
        model4[1] = [0, 0, 1, 0, 0];
        model4[2] = [0, 1, 1, 0, 0];
        model4[3] = [0, 0, 1, 1, 0];
        model4[4] = [0, 0, 0, 0, 0];
        var name4 = color + '_' + 4;
        var chess4 = new Chess(name4, color, model4, 0, 0);
        this.formChooseChess(chess4);
        chessMap.set(name4, chess4);

    };


    this.initChessBoard = function () {
        var chessboard = $('.chessboard');
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                var chess = $('<div class="chess-box-game"><div class="chess-box-inner"></div></div>');
                //onclick="chessDown(this)
                var id = j + 'x' + i;
                chess.attr('id', id);
                chessboard.append(chess);
            }
        }

    };

    this.start = function () {
        var map = new Map();
        this.initChessBoard();
        this.initChooseChessByColor(map, blue);
        this.initChooseChessByColor(map, green);
        this.initChooseChessByColor(map, red);
        this.initChooseChessByColor(map, yellow);
        this.blokusController = new BlokusController(map);
    };

    this.frameUpdate = function () {

        if (this.blokusUIController.deadline < 0) {
            if (this.blokusUIController.blokusController.finishCount >= MAX_PLAYERS_COUNT - 1) {
                // this.blokusUIController.deadline = this.blokusUIController.defaulDeadline;
                $('.time-box').text(0);
                return;
            }
            alert(this.blokusUIController.blokusController.currentColor + ' finish');
            this.blokusUIController.lose(this.blokusUIController.blokusController.currentColor);
            $('.time-box').text(this.blokusUIController.deadline--);

        } else {
            $('.time-box').text(this.blokusUIController.deadline--);

        }

    };

    this.formDeadlineController = function () {
        return window.setInterval(this.frameUpdate, 1000);
    };

    this.defaulDeadline = 1500;
    this.deadline = this.defaulDeadline;
    this.currentChessName = '';
    this.blokusController = null;
    this.deadlineController = this.formDeadlineController();
    this.start();

    this.isMove = false;
    this.abs_x;
    this.abs_y;

    this.clickChooseChess = function (chessName) {
        this.isMove = true;
        this.currentChessName = chessName;
        var obj = $('#combine' + this.currentChessName);
        // $('.choose-chess-button-relative').css('position')
        // obj.css('position', '');
        obj.css('position', 'fixed');
        this.abs_x = obj.width() / 2;
        this.abs_y = obj.height() / 2;
    };

    this.moving = function (x, y) {
        if (this.isMove) {
            var obj = $('#combine' + this.currentChessName);
            var height = $(document).scrollTop();
            obj.css({
                'left': x - this.abs_x,
                'top': y - this.abs_y - height
            });
        }
    };

    this.mouseUp = function (x, y) {
        this.isMove = false;
        var obj = $('#combine' + this.currentChessName);
        // obj.css({
        //     'position': 'relative',
        //     'left': '-210px',
        //     'top': '0px'
        // });

        obj.removeAttr('style');
        // obj.removeClass('choose-chess-button-hide');
        // obj.addClass('choose-chess-button-hide');

        $('.chess-box-game').each(function () {
            var obj = $(this);
            var offset = obj.offset();
            if (x < offset.left + obj.width() && x > offset.left
                && y < offset.top + obj.height() && y > offset.top) {
                var xx = this.id.split('x')[0];
                var yy = this.id.split('x')[1];
                // blokusUIController.chessDown(x, y);
                window.blokusUIController.chessDown(xx, yy);
                return false;
            }
        });
    };


    this.rotation = function () {
        var rotationFlag = this.blokusController.rotation(this.currentChessName);
        if (rotationFlag != -1) {
            $('#rotation' + this.currentChessName).attr('rotation', 'custom-rotation-' + rotationFlag);
        }
    };

    this.symmetry = function () {
        var symmetryFlag = this.blokusController.symmetry(this.currentChessName);
        if (symmetryFlag != -1) {
            $('#symmetry' + this.currentChessName).attr('symmetry', 'custom-symmetry-' + symmetryFlag);
        }
    };

    this.chessDown = function (x, y) {
        var blokusControllerJudgeResult = this.blokusController.judge(x, y, this.currentChessName);
        this.handleBlokusControllerJudgeResult(blokusControllerJudgeResult);
    };


    this.handleBlokusControllerJudgeResult = function (blokusControllerJudgeResult) {
        if (blokusControllerJudgeResult == null) {
            return;
        } else {

            //to network

            var blokusJudgeResult = blokusControllerJudgeResult.blokusJudgeResult;
            var chess = blokusControllerJudgeResult.chess;
            var x = blokusJudgeResult.x;
            var y = blokusJudgeResult.y;
            var model = blokusJudgeResult.model;

            this.chessDone(x, y, chess.model, chess.name);
        }
    };


    this.chessDone = function (x, y, model, chessName) {
        var currentChess = this.blokusController.chessMap.get(chessName);
        if (currentChess == undefined) {
            return null;
        }

        this.deadline = this.defaulDeadline;
        this.formChessAfterDown(x, y, model, currentChess.color);
        this.blokusController.chessDone(x, y, model, currentChess.color);
        this.showChoosePanel(this.blokusController.currentColor);
        $('#chooseButton' + currentChess.name).addClass('custom-hide');

    };


    this.showChoosePanel = function (nextColor) {
        $('[name=content-right-radio]').each(function () {
            if (this.id == ('content-right-radio-' + nextColor)) {
                $(this).prop('checked', 'checked');
            } else {
                $(this).removeProp('checked');
            }
        });
    };


    this.formChessAfterDown = function (x, y, model, color) {
        for (var j = 0; j < 5; j++) {
            for (var i = 0; i < 5; i++) {
                if (model[j][i] == 1) {
                    var wx = x - 2 + i;
                    var wy = y - 2 + j;
                    $('#' + wx + 'x' + wy).html('<div class="chess-' + color + '"></div>');
                }
            }
        }
    };

    this.lose = function (color) {
        var nextColor = this.blokusController.lose(color);
        this.showChoosePanel(nextColor);
        this.deadline = this.defaulDeadline;
    };


}




