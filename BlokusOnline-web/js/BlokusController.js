function BlokusControllerJudgeResult(blokusJudgeResult, chess, nextColor) {
    this.blokusJudgeResult = blokusJudgeResult;
    this.chess = chess;
    this.nextColor = nextColor;
}

function BlokusController(chessMap) {


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

    this.loseColor = [0, 0, 0, 0, 0];  //记录已经输了的颜色
    this.currentColor = blue;    //当前下棋子的颜色
    this.myColor = 0;  //玩家的颜色
    this.loseCount = 0;  //已经输的玩家的个数


    this.judge = function (x, y, currentChessName) {
        var currentChess = this.chessMap.get(currentChessName);
        if (currentChess == undefined) {
            return null;
        } else if (currentChess.color != this.currentColor) {

        } else {
            var blokusParam = new BlokusParam(x, y, this.allChess, currentChess.model, currentChess.color);
            var blokusJudgeResult = judge(blokusParam);
            if (blokusJudgeResult.result) {
                var x = blokusJudgeResult.x;
                var y = blokusJudgeResult.y;
                var model = currentChess.model;
                var color = currentChess.color;
                this.updateChess(x, y, model, color);
                this.currentColor = this.getNextColor(this.currentColor);
                this.currentChessName = '';
                return new BlokusControllerJudgeResult(blokusJudgeResult, currentChess, this.currentColor);
            } else {
                return null;
            }
        }
    };

    this.getNextColor = function (color) {
        if (this.loseCount >= MAX_PLAYERS_COUNT) {
            return color;
        }

        do {
            color++;
            if (color > MAX_PLAYERS_COUNT) {
                color = 1;
            }
        } while (this.loseColor[color] == 1);

        return color;
    };

    this.updateChess = function (x, y, model, color) {
        for (var j = 0; j < 5; j++) {
            for (var i = 0; i < 5; i++) {
                if (model[j][i] == 1) {
                    var wx = x - 2 + i;
                    var wy = y - 2 + j;
                    this.allChess[wx][wy] = color;
                }
            }
        }
    };

    this.rotation = function (currentChessName) {
        var currentChess = this.chessMap.get(currentChessName);
        if (currentChess == undefined) {
            return -1;
        } else {
            currentChess.rotation();
            return currentChess.rotationFlag;
        }

    };

    this.symmetry = function (currentChessName) {
        var currentChess = this.chessMap.get(currentChessName);
        if (currentChess == undefined) {
            return -1;
        }
        currentChess.symmetry();
        return currentChess.symmetryFlag;
    };


}