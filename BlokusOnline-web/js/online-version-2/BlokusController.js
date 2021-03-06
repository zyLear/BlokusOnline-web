function BlokusControllerJudgeResult(blokusJudgeResult, chess) {
    this.blokusJudgeResult = blokusJudgeResult;
    this.chess = chess;
}

/**
 * 记录本局棋局的状态信息
 *
 * 比如输了颜色  当前下棋颜色
 *
 *
 * @param chessMap
 * @param color
 * @constructor
 */
function BlokusController(chessMap, color) {


    this.init = function () {
        var allChess = new Array(20);
        for (var i = 0; i < 20; i++) {
            allChess[i] =
                [
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0
                ]
        }
        return allChess;
    };

    this.chessMap = chessMap;
    this.allChess = this.init();

    this.finishColor = [0, 0, 0, 0, 0];  //记录已经结束比赛棋子的颜色
    this.currentColor = blue;    //当前下棋子的颜色
    this.myColor = color;  //玩家的颜色
    this.finishCount = 0;  //已经结束比赛的玩家的个数


    this.judge = function (x, y, currentChessName) {

        if (this.currentColor !== this.myColor) {
            return null;
        }

        var currentChess = this.chessMap.get(currentChessName);
        if (currentChess === undefined) {
            return null;
        } else if (currentChess.color !== this.currentColor) {
            return null;
        } else {
            var blokusParam = new BlokusParam(x, y, this.allChess, currentChess.model, currentChess.color);
            var blokusJudgeResult = judge(blokusParam);
            if (blokusJudgeResult.result) {
                return new BlokusControllerJudgeResult(blokusJudgeResult, currentChess);
            } else {
                return null;
            }
        }
    };


    this.chessDone = function (x, y, model, color) {
        this.updateChess(x, y, model, color);
        this.currentColor = this.getNextColor(this.currentColor);
    };

    this.getNextColor = function (color) {
        if (this.finishCount >= MAX_PLAYERS_COUNT) {
            return color;
        }

        do {
            color++;
            if (color > MAX_PLAYERS_COUNT) {
                color = 1;
            }
        } while (this.finishColor[color] === 1);

        return color;
    };

    this.updateChess = function (x, y, model, color) {
        for (var j = 0; j < 5; j++) {
            for (var i = 0; i < 5; i++) {
                if (model[j][i] === 1) {
                    var wx = x - 2 + i;
                    var wy = y - 2 + j;
                    this.allChess[wx][wy] = color;
                }
            }
        }
    };

    this.rotation = function (currentChessName) {
        var currentChess = this.chessMap.get(currentChessName);
        if (currentChess === undefined) {
            return -1;
        } else {
            currentChess.rotation();
            return currentChess.rotationFlag;
        }

    };

    this.symmetry = function (currentChessName) {
        var currentChess = this.chessMap.get(currentChessName);
        if (currentChess === undefined) {
            return -1;
        }
        currentChess.symmetry();
        return currentChess.symmetryFlag;
    };


    this.finish = function (color) {
        if (this.finishCount === MAX_PLAYERS_COUNT) {
            //color赢啦
            // return this.currentColor;
            return false
        }
        if (this.finishColor[color] === 1) {
            //color已经输了，不能再输
            // return this.currentColor;
            return false;
        }

        this.finishCount++;
        this.finishColor[color] = 1;

        // if (this.currentColor <= color) {
        //     firstFour--;
        // }
        if (color === this.currentColor) {
            this.currentColor = this.getNextColor(color);
        }
        // return this.currentColor
        return true;
    }


}