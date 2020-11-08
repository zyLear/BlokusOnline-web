// function test() {
//     alert('yes');
// }

/**
 * 页面相关的操作
 *
 * start  开始棋局 -》 init 初始化棋盘
 *
 *
 *
 *
 *
 * @constructor
 */
function BlokusUIController() {


    this.defaulDeadline = 15;
    this.deadline = null;

    //每次棋局start设置
    this.currentChessName = '';
    this.blokusController = null;
    this.deadlineController = null;

    this.isMove = false;
    this.abs_x;
    this.abs_y;

    this.playerNameMap = null;


    this.start = function (color, playerList) {
        this.deadline = this.defaulDeadline;

        $(document).mouseup(function (event) {
            blokusUIController.mouseUp(event.pageX, event.pageY);
        });

        $(document).mousemove(function (event) {
            blokusUIController.moving(event.pageX, event.pageY);
        });

        if (this.deadlineController != null) {
            clearInterval(this.deadlineController);
        }
        this.deadlineController = this.formDeadlineController();
        var map = new Map();
        this.initChessBoard();
        this.initChooseChessByColor(map, blue);
        this.initChooseChessByColor(map, green);
        this.initChooseChessByColor(map, red);
        this.initChooseChessByColor(map, yellow);
        this.showChoosePanel(color);
        this.blokusController = new BlokusController(map, color);

        //清空消息面板
        $('#game-panel-content').html('');

        this.playerNameMap = new Map();


        playerList.forEach(function (e) {
            blokusUIController.playerNameMap.set(e.color, e.account);
        });


    };


    this.formChooseChess = function (chess) {

        var contentRight = $('.content-right-' + chess.color);

        var symmetryNode = $('<div id="symmetry' + chess.name + '"  ></div>');

        var rotationNode = $('<div id="rotation' + chess.name + '" onmousedown="clickChooseChess(\'' + chess.name + '\',event)"></div>');

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

        var contentRight = $('.content-right-' + color);
        contentRight.html('');

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
        chessboard.css('width', MAX_ROW_AND_COLUMN * 42);
        chessboard.css('height', MAX_ROW_AND_COLUMN * 42);
        chessboard.html('');
        for (var i = 0; i < MAX_ROW_AND_COLUMN; i++) {
            for (var j = 0; j < MAX_ROW_AND_COLUMN; j++) {
                var chess;
                if (MAX_ROW_AND_COLUMN === 20) {
                    if (i === 0 && j === MAX_ROW_AND_COLUMN - 1) {
                        chess = $('<div class="chess-box-game"><div class="chess-box-inner-1"></div></div>');
                    } else if (i === 0 && j === 0) {
                        chess = $('<div class="chess-box-game"><div class="chess-box-inner-2"></div></div>');
                    } else if (i === MAX_ROW_AND_COLUMN - 1 && j === 0) {
                        chess = $('<div class="chess-box-game"><div class="chess-box-inner-3"></div></div>');
                    } else if (i === MAX_ROW_AND_COLUMN - 1 && j === MAX_ROW_AND_COLUMN - 1) {
                        chess = $('<div class="chess-box-game"><div class="chess-box-inner-4"></div></div>');
                    } else {
                        chess = $('<div class="chess-box-game"></div>');
                    }
                } else {
                    if (i === 0 && j === MAX_ROW_AND_COLUMN - 1) {
                        chess = $('<div class="chess-box-game"><div class="chess-box-inner-1"></div></div>');
                    } else if (i === MAX_ROW_AND_COLUMN - 1 && j === 0) {
                        chess = $('<div class="chess-box-game"><div class="chess-box-inner-2"></div></div>');
                    } else {
                        chess = $('<div class="chess-box-game"></div>');
                    }
                }

                //onclick="chessDown(this)
                var id = j + 'x' + i;
                chess.attr('id', id);
                chessboard.append(chess);
            }
        }

    };


    this.end = function () {
        $(document).mouseup(function () {
            // blokusUIController.mouseUp(event.pageX, event.pageY);
        });

        $(document).mousemove(function () {
            // blokusUIController.moving(event.pageX, event.pageY);
        });

        if (this.deadlineController != null) {
            clearInterval(this.deadlineController);
        }
    };

    this.frameUpdate = function () {

        //说明下棋期限时间到  玩家输了
        if (window.blokusUIController.deadline < 0) {
            $('.time-box').text(0);

            //最后一位了  忽略
            if (window.blokusUIController.blokusController.loseCount >= MAX_PLAYERS_COUNT - 1) {
                return;
            }

            if (window.blokusUIController.blokusController.currentColor
                === window.blokusUIController.blokusController.myColor) {
                var msg = formLoseMsg(window.blokusUIController.blokusController.myColor);
                window.webSocketClient.sendMessage(msg);
            } else {

            }

            // this.blokusUIController.lose(this.blokusUIController.blokusController.currentColor);
            // $('.time-box').text(this.blokusUIController.deadline--);

        } else {
            $('.time-box').text(window.blokusUIController.deadline--);

        }

    };

    this.formDeadlineController = function () {
        return window.setInterval(this.frameUpdate, 1000);
    };


    this.clickChooseChess = function (chessName, event) {
        this.isMove = true;
        this.currentChessName = chessName;
        var obj = $('#combine' + this.currentChessName);
        // $('.choose-chess-button-relative').css('position')
        // obj.css('position', '');
        obj.css({'position': 'fixed'});
        this.abs_x = obj.width() / 2;
        this.abs_y = obj.height() / 2;
        this.moving(event.x, event.y)

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
        if (rotationFlag !== -1) {
            $('#rotation' + this.currentChessName).attr('rotation', 'custom-rotation-' + rotationFlag);
        }
    };

    this.symmetry = function () {
        var symmetryFlag = this.blokusController.symmetry(this.currentChessName);
        if (symmetryFlag !== -1) {
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


            var msg = formChessDoneMsg(x, y, chess.model, chess.name);
            webSocketClient.sendMessage(msg);
            this.chessDone(x, y, chess.model, chess.name);
        }
    };


    /**
     * 页面下棋函数  没有逻辑判断  直接更新棋盘和数组
     *
     * @param x
     * @param y
     * @param model
     * @param chessName
     * @returns {null}
     */
    this.chessDone = function (x, y, model, chessName) {
        var currentChess = this.blokusController.chessMap.get(chessName);
        if (currentChess === undefined) {
            return null;
        }

        this.deadline = this.defaulDeadline;
        this.formChessAfterDown(x, y, model, currentChess.color);
        this.blokusController.chessDone(x, y, model, currentChess.color);
        // this.showChoosePanel(this.blokusController.currentColor);
        $('#chooseButton' + currentChess.name).addClass('custom-hide');
        this.setCurrentColor();
    };


    this.showChoosePanel = function (nextColor) {
        $('[name=content-right-radio]').each(function () {
            if (this.id === ('content-right-radio-' + nextColor)) {
                $(this).prop('checked', 'checked');
            } else {
                $(this).removeProp('checked');
            }
        });
    };


    /**
     * 页面画图
     *
     * @param x
     * @param y
     * @param model
     * @param color
     */
    this.formChessAfterDown = function (x, y, model, color) {
        for (var j = 0; j < 5; j++) {
            for (var i = 0; i < 5; i++) {
                if (model[j][i] === 1) {
                    var wx = x - 2 + i;
                    var wy = y - 2 + j;
                    $('#' + wx + 'x' + wy).html('<div class="chess-' + color + '"></div>');
                }
            }
        }
    };

    /**
     * 按钮点击认输
     *
     */
    this.giveUp = function () {
        var msg = formGiveUpMsg(this.blokusController.myColor);
        webSocketClient.sendMessage(msg);
    };


    /**
     * 页面其他显示  输了
     *
     * @param color
     * @param msgType
     */
    this.lose = function (color, msgType) {
        if (this.blokusController.lose(color)) {
            this.setCurrentColor();
            var name = this.getPlayerName(color);
            if (MsgType.LOSE === msgType) {
                $('#game-panel-content').append('<div> 玩家(' + name + ')输了！<div>');
            } else if (MsgType.GIVE_UP === msgType) {
                $('#game-panel-content').append('<div> 玩家(' + name + ')认输了！<div>');
            } else if (MsgType.GIVE_UP === msgType) {
                $('#game-panel-content').append('<div> 玩家(' + name + ')离开房间！<div>');
            }
            this.deadline = this.defaulDeadline;
        }
    };


    /**
     * 页面其他显示  赢了
     *
     * @param color
     */
    this.win = function (color) {
        var name = this.getPlayerName(color);
        $('#game-panel-content').append('<div> 玩家(' + name + ')赢了！<div>');
    };


    this.getPlayerName = function (color) {
        return this.playerNameMap.get(color);
    };

    this.setCurrentColor = function () {
        $('.chessboard-parent').removeClass('border-1');
        $('.chessboard-parent').removeClass('border-2');
        $('.chessboard-parent').removeClass('border-3');
        $('.chessboard-parent').removeClass('border-4');
        $('.chessboard-parent').addClass('border-' + this.blokusController.currentColor);

        $('#current-color').removeClass();
        $('#current-color').addClass('current-color-' + this.blokusController.currentColor);

    }


}




