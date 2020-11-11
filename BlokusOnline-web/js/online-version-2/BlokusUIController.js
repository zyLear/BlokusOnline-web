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


    this.defaulDeadline = 180;
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

        // $(document).mouseup(function (event) {
        //     blokusUIController.mouseUp(event.pageX, event.pageY);
        // });
        $(document).click(function (event) {
            blokusUIController.mouseUp(event.pageX, event.pageY);
            // console.log('xxxx')
            console.log('a')
        });



        $(document).mousemove(function (event) {
            blokusUIController.moving(event.pageX, event.pageY);
        });



        $(document).keyup(function(event){
            switch(event.keyCode) {
            case  81:
                rotation();
                break;
            case  69:
                symmetry();
                break;
        }
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
        this.currentChessName = '';

    };


    this.formChooseChess = function (chess) {

        var contentRight = $('.content-right-' + chess.color);

        var symmetryNode = $('<div id="symmetry' + chess.name + '"  ></div>');

        var rotationNode = $('<div id="rotation' + chess.name + '" onclick="clickChooseChess(\'' + chess.name + '\',event)"></div>');

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
                if (chess.model[i][j] === 1) {
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

        var model5 = new Array(5);
        model5[0] = [0, 0, 0, 0, 0];
        model5[1] = [0, 1, 1, 1, 0];
        model5[2] = [0, 0, 1, 0, 0];
        model5[3] = [0, 0, 1, 0, 0];
        model5[4] = [0, 0, 0, 0, 0];
        var name5 = color + '_' + 5;
        var chess5 = new Chess(name5, color, model5, 0, 0);
        this.formChooseChess(chess5);
        chessMap.set(name5, chess5);

        var model6 = new Array(5);
        model6[0] = [0, 0, 0, 0, 0];
        model6[1] = [0, 0, 0, 0, 0];
        model6[2] = [1, 1, 1, 1, 0];
        model6[3] = [0, 0, 0, 0, 0];
        model6[4] = [0, 0, 0, 0, 0];
        var name6 = color + '_' + 6;
        var chess6 = new Chess(name6, color, model6, 0, 0);
        this.formChooseChess(chess6);
        chessMap.set(name6, chess6);

        var model7 = new Array(5);
        model7[0] = [0, 0, 0, 0, 0];
        model7[1] = [0, 0, 0, 0, 0];
        model7[2] = [1, 1, 1, 1, 1];
        model7[3] = [0, 0, 0, 0, 0];
        model7[4] = [0, 0, 0, 0, 0];
        var name7 = color + '_' + 7;
        var chess7 = new Chess(name7, color, model7, 0, 0);
        this.formChooseChess(chess7);
        chessMap.set(name7, chess7);

        var model8 = new Array(5);
        model8[0] = [0, 0, 0, 0, 0];
        model8[1] = [0, 0, 0, 0, 0];
        model8[2] = [1, 1, 1, 1, 0];
        model8[3] = [0, 0, 1, 0, 0];
        model8[4] = [0, 0, 0, 0, 0];
        var name8 = color + '_' + 8;
        var chess8 = new Chess(name8, color, model8, 0, 0);
        this.formChooseChess(chess8);
        chessMap.set(name8, chess8);

        var model9 = new Array(5);
        model9[0] = [0, 0, 0, 0, 0];
        model9[1] = [0, 0, 0, 0, 0];
        model9[2] = [1, 1, 1, 0, 0];
        model9[3] = [0, 0, 1, 1, 0];
        model9[4] = [0, 0, 0, 0, 0];
        var name9 = color + '_' + 9;
        var chess9 = new Chess(name9, color, model9, 0, 0);
        this.formChooseChess(chess9);
        chessMap.set(name9, chess9);

        var model10 = new Array(5);
        model10[0] = [0, 0, 0, 0, 0];
        model10[1] = [0, 0, 1, 0, 0];
        model10[2] = [0, 0, 1, 0, 0];
        model10[3] = [0, 0, 1, 1, 0];
        model10[4] = [0, 0, 0, 0, 0];
        var name10 = color + '_' + 10;
        var chess10 = new Chess(name10, color, model10, 0, 0);
        this.formChooseChess(chess10);
        chessMap.set(name10, chess10);

        var model11 = new Array(5);
        model11[0] = [0, 0, 0, 0, 0];
        model11[1] = [0, 0, 1, 0, 0];
        model11[2] = [0, 0, 1, 1, 0];
        model11[3] = [0, 0, 0, 1, 0];
        model11[4] = [0, 0, 0, 0, 0];
        var name11 = color + '_' + 11;
        var chess11 = new Chess(name11, color, model11, 0, 0);
        this.formChooseChess(chess11);
        chessMap.set(name11, chess11);

        var model12 = new Array(5);
        model12[0] = [0, 0, 0, 0, 0];
        model12[1] = [0, 0, 1, 0, 0];
        model12[2] = [0, 0, 1, 1, 0];
        model12[3] = [0, 0, 1, 1, 0];
        model12[4] = [0, 0, 0, 0, 0];
        var name12 = color + '_' + 12;
        var chess12 = new Chess(name12, color, model12, 0, 0);
        this.formChooseChess(chess12);
        chessMap.set(name12, chess12);

        var model13 = new Array(5);
        model13[0] = [0, 0, 0, 0, 0];
        model13[1] = [0, 1, 0, 0, 0];
        model13[2] = [0, 1, 0, 0, 0];
        model13[3] = [0, 1, 1, 1, 0];
        model13[4] = [0, 0, 0, 0, 0];
        var name13 = color + '_' + 13;
        var chess13 = new Chess(name13, color, model13, 0, 0);
        this.formChooseChess(chess13);
        chessMap.set(name13, chess13);

        var model14 = new Array(5);
        model14[0] = [0, 0, 0, 0, 0];
        model14[1] = [0, 1, 1, 0, 0];
        model14[2] = [0, 0, 1, 0, 0];
        model14[3] = [0, 0, 1, 1, 0];
        model14[4] = [0, 0, 0, 0, 0];
        var name14 = color + '_' + 14;
        var chess14 = new Chess(name14, color, model14, 0, 0);
        this.formChooseChess(chess14);
        chessMap.set(name14, chess14);

        var model15 = new Array(5);
        model15[0] = [0, 0, 0, 0, 0];
        model15[1] = [0, 0, 1, 1, 0];
        model15[2] = [0, 0, 1, 1, 0];
        model15[3] = [0, 0, 0, 0, 0];
        model15[4] = [0, 0, 0, 0, 0];
        var name15 = color + '_' + 15;
        var chess15 = new Chess(name15, color, model15, 0, 0);
        this.formChooseChess(chess15);
        chessMap.set(name15, chess15);

        var model16 = new Array(5);
        model16[0] = [0, 0, 0, 0, 0];
        model16[1] = [0, 1, 0, 1, 0];
        model16[2] = [0, 1, 1, 1, 0];
        model16[3] = [0, 0, 0, 0, 0];
        model16[4] = [0, 0, 0, 0, 0];
        var name16 = color + '_' + 16;
        var chess16 = new Chess(name16, color, model16, 0, 0);
        this.formChooseChess(chess16);
        chessMap.set(name16, chess16);

        var model17 = new Array(5);
        model17[0] = [0, 0, 0, 0, 0];
        model17[1] = [0, 0, 0, 0, 0];
        model17[2] = [0, 1, 1, 1, 0];
        model17[3] = [0, 0, 0, 0, 0];
        model17[4] = [0, 0, 0, 0, 0];
        var name17 = color + '_' + 17;
        var chess17 = new Chess(name17, color, model17, 0, 0);
        this.formChooseChess(chess17);
        chessMap.set(name17, chess17);

        var model18 = new Array(5);
        model18[0] = [0, 0, 0, 0, 0];
        model18[1] = [0, 0, 0, 0, 0];
        model18[2] = [0, 1, 1, 0, 0];
        model18[3] = [0, 0, 0, 0, 0];
        model18[4] = [0, 0, 0, 0, 0];
        var name18 = color + '_' + 18;
        var chess18 = new Chess(name18, color, model18, 0, 0);
        this.formChooseChess(chess18);
        chessMap.set(name18, chess18);

        var model19 = new Array(5);
        model19[0] = [0, 0, 0, 0, 0];
        model19[1] = [0, 1, 0, 0, 0];
        model19[2] = [0, 1, 1, 0, 0];
        model19[3] = [0, 0, 1, 1, 0];
        model19[4] = [0, 0, 0, 0, 0];
        var name19 = color + '_' + 19;
        var chess19 = new Chess(name19, color, model19, 0, 0);
        this.formChooseChess(chess19);
        chessMap.set(name19, chess19);

        var model20 = new Array(5);
        model20[0] = [0, 0, 0, 0, 0];
        model20[1] = [0, 0, 0, 0, 0];
        model20[2] = [1, 1, 1, 1, 0];
        model20[3] = [0, 0, 0, 1, 0];
        model20[4] = [0, 0, 0, 0, 0];
        var name20 = color + '_' + 20;
        var chess20 = new Chess(name20, color, model20, 0, 0);
        this.formChooseChess(chess20);
        chessMap.set(name20, chess20);

        var model21 = new Array(5);
        model21[0] = [0, 0, 0, 0, 0];
        model21[1] = [0, 0, 0, 0, 0];
        model21[2] = [0, 0, 1, 0, 0];
        model21[3] = [0, 0, 0, 0, 0];
        model21[4] = [0, 0, 0, 0, 0];
        var name21 = color + '_' + 21;
        var chess21 = new Chess(name21, color, model21, 0, 0);
        this.formChooseChess(chess21);
        chessMap.set(name21, chess21);

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

            //最后了  忽略
            if (window.blokusUIController.blokusController.finishCount >= MAX_PLAYERS_COUNT) {
                return;
            }

            if (window.blokusUIController.blokusController.currentColor
                === window.blokusUIController.blokusController.myColor) {
                var msg = formLoseMsg(window.blokusUIController.blokusController.myColor);
                window.webSocketClient.sendMessage(msg);
            } else {

            }

        } else {
            $('.time-box').text(window.blokusUIController.deadline--);

        }

    };

    this.formDeadlineController = function () {
        return window.setInterval(this.frameUpdate, 1000);
    };


    this.clickChooseChess = function (chessName, event) {
        //如果不是在移动中
        if (!this.isMove) {
            this.isMove = true;
            this.currentChessName = chessName;
            var obj = $('#combine' + this.currentChessName);
            // $('.choose-chess-button-relative').css('position')
            // obj.css('position', '');
            obj.css({'position': 'fixed'});
            this.abs_x = obj.width() / 2;
            this.abs_y = obj.height() / 2;
            this.moving(event.x, event.y);
            console.log('cc');
            //取消点击事件的父元素传播
            event.stopPropagation();
        }
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
     * 页面其他显示  结束比赛
     *
     * @param color
     * @param msgType
     * @param rank
     */
    this.lose = function (color, msgType, rank) {
        if (this.blokusController.finish(color)) {
            this.setCurrentColor();
            var name = this.getPlayerName(color);
            var colorString = this.getColorString(color);
            if (MsgType.LOSE === msgType) {
                $('#game-panel-content').append('<div>' + colorString + '玩家(' + name + ')输了！获得第' + rank + '名<div>');
            } else if (MsgType.GIVE_UP === msgType) {
                $('#game-panel-content').append('<div>' + colorString + '玩家(' + name + ')认输了！获得第' + rank + '名<div>');
            } else if (MsgType.GIVE_UP === msgType) {
                $('#game-panel-content').append('<div>' + colorString + '玩家(' + name + ')离开房间！获得第' + rank + '名<div>');
            }
            this.deadline = this.defaulDeadline;
        }
    };


    /**
     * 页面其他显示  赢了
     *
     * @param color
     * @param rank
     */
    this.win = function (color, rank) {
        var name = this.getPlayerName(color);
        var colorString = this.getColorString(color);
        this.blokusController.finish(color);
        $('#game-panel-content').append('<div>' + colorString + '玩家(' + name + ')获得第' + rank + '名<div>');
    };

    this.getColorString = function (color) {
        if (color === 1) {
            return '蓝色';
        } else if (color === 2) {
            return '绿色';
        } else if (color === 3) {
            return '红色';
        } else if (color === 4) {
            return '黄色';
        }
    };

    this.getPlayerName = function (color) {
        return this.playerNameMap.get(color);
    };


    this.setCurrentColor = function () {
        $('#chessboard-parent').removeClass('border-1');
        $('#chessboard-parent').removeClass('border-2');
        $('#chessboard-parent').removeClass('border-3');
        $('#chessboard-parent').removeClass('border-4');
        $('#chessboard-parent').addClass('border-' + this.blokusController.currentColor);

        $('#current-color').removeClass();
        $('#current-color').addClass('current-color-' + this.blokusController.currentColor);

    }


}




