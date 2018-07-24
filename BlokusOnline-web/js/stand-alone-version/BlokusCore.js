

var MAX_PLAYERS_COUNT = 4; //玩家数量
var MAX_ROW_AND_COLUMN = 20;

var blue = 1;//定义颜色常量
var green = 2;
var red = 3;
var yellow = 4;


function Chess(name, color, model, rotationFlag, symmetryFlag) {

    this.name = name;
    this.color = color;
    this.model = model;
    this.rotationFlag = rotationFlag;
    this.symmetryFlag = symmetryFlag;

    this.rotation = function() {
        if (this.symmetryFlag == 0) {
            this.rotationFirst();
        } else {
            this.rotationSecond();
        }
    };


    this.rotationFirst = function() {
        var newModel = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];    //数组旋转
        for (var i = 0; i < 5; i++)
            for (var j = 0; j < 5; j++)
                newModel[j][abs(4 - i)] = this.model[i][j];
        for (var i = 0; i < 5; i++)
            for (var j = 0; j < 5; j++)
                this.model[i][j] = newModel[i][j];

        this.rotationFlag++;    //图片旋转
        if (this.rotationFlag > 3) {
            this.rotationFlag = 0;
        }
    };

    function abs(i) {
        if (i >= 0) return i;
        else return -i;
    }

    this.rotationSecond = function () {
        var newModel = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];     //数组旋转
        for (var i = 0; i < 5; i++)
            for (var j = 0; j < 5; j++)
                newModel[abs(4 - i)][j] = this.model[j][i];
        for (var i = 0; i < 5; i++)
            for (var j = 0; j < 5; j++)
                this.model[i][j] = newModel[i][j];

        this.rotationFlag++;    //图片旋转
        if (this.rotationFlag > 3) {
            this.rotationFlag = 0;
        }
    };


    this.symmetry = function() {
        var copy = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];    //数组对称

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                copy[j][i] = this.model[j][i];
            }
        }
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                this.model[j][i] = copy[j][4 - i];
            }
        }
        this.symmetryFlag = 1 - this.symmetryFlag;  //图片对称
    }

}

function BlokusParam(x, y, allChess, model, color) {
    this.x = x;
    this.y = y;
    this.allChess = allChess; //棋盘数组，记录棋局信息
    this.model = model;
    this.color = color;
}

function BlokusJudgeResult(x, y, result) {
    this.x = x;
    this.y = y;
    this.result = result;
}


function judge(blokusParam) {


    var x = blokusParam.x;
    var y = blokusParam.y;
    var allChess = blokusParam.allChess;
    var model = blokusParam.model;
    var color = blokusParam.color;

    return judgeAround(x, y, allChess, model, color);
}

function judgeAround(x, y, allChess, model, color) {
    var judgeSuccess = false;
    var lastX = x;
    var lastY = y;

    if (judgeAll(x, y, allChess, model, color)) {
        judgeSuccess = true;
    } else {
        var points = getAroundPoints(x, y);
        for (var i in points) {
            var point = points[i];
            // alert(point.x + "," + point.y);
            if (judgeAll(point.x, point.y, allChess, model, color)) {
                judgeSuccess = true;
                lastX = point.x;
                lastY = point.y;
                break;
            }
        }
    }
    return new BlokusJudgeResult(lastX, lastY, judgeSuccess);

}

function ChessPoint(x, y) {
    this.x = x;
    this.y = y;
}

function getAroundPoints(x, y) {
    var points = new Array(8);
    points.push(new ChessPoint(parseInt(x) - 1, parseInt(y) - 1));
    points.push(new ChessPoint(parseInt(x) - 1, parseInt(y)));
    points.push(new ChessPoint(parseInt(x) - 1, parseInt(y) + 1));
    points.push(new ChessPoint(parseInt(x) + 1, parseInt(y) - 1));
    points.push(new ChessPoint(parseInt(x) + 1, parseInt(y)));
    points.push(new ChessPoint(parseInt(x) + 1, parseInt(y) + 1));
    points.push(new ChessPoint(parseInt(x), parseInt(y) - 1));
    points.push(new ChessPoint(parseInt(x), parseInt(y) + 1));
    return points;
}


function judgeAll(x, y, allChess, model, color) {
    return judgeFirstTime(x, y, model, color) || judgeSecond(x, y, allChess, model, color);
}


//判断棋子位置是否出界
function outLine(x, y) {
    if (x < 0 || x > MAX_ROW_AND_COLUMN - 1 || y < 0 || y > MAX_ROW_AND_COLUMN - 1) {
        return true;
    }
    return false;
}

//判断数组模型是否出界
function modelOutLine(x, y) {
    if (x < 0 || x > 4 || y < 0 || y > 4) {
        return true;
    }
    return false;
}

//前四次下棋子判断
function judgeFirstTime(x, y, model, color) {
    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 5; i++) {
            if (model[j][i] == 1) {
                var wx = x - 2 + i;
                var wy = y - 2 + j;
                if (outLine(wx, wy)) {
                    console.log("出界");
                    return false;
                }
            }
        }
    }
    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 5; i++) {
            if (model[j][i] == 1) {
                var wx = x - 2 + i;
                var wy = y - 2 + j;
                if (MAX_PLAYERS_COUNT == 2) {
                    switch (color) {
                        case green:
                            if (wx == 0 && wy == MAX_ROW_AND_COLUMN - 1) {
                                return true;
                            }
                            break;
                        case blue:
                            if (wx == MAX_ROW_AND_COLUMN - 1 && wy == 0) {
                                return true;
                            }
                            break;
                    }
                } else {
                    switch (color) {
                        case green:
                            if (wx == 0 && wy == 0) {
                                return true;
                            }
                            break;
                        case red:
                            if (wx == 0 && wy == MAX_ROW_AND_COLUMN - 1) {
                                return true;
                            }
                            break;
                        case yellow:
                            if (wx == MAX_ROW_AND_COLUMN - 1 && wy == MAX_ROW_AND_COLUMN - 1) {
                                return true;
                            }
                            break;
                        case blue:
                            if (wx == MAX_ROW_AND_COLUMN - 1 && wy == 0) {
                                return true;
                            }
                            break;
                    }
                }
            }
        }
    }
    return false;
}


//判断四边是否有棋子跟自身颜色一样，有就返回true
function judgeOne(new_wx, new_wy, new_i, new_j, allChess, model, color) {
    if (!outLine(new_wx, new_wy)) {
        if (modelOutLine(new_i, new_j)) {
            if (allChess[new_wx][new_wy] == color) {
                return true;
            }
        } else if (model[new_j][new_i] != 1) {
            if (allChess[new_wx][new_wy] == color) {
                return true;
            }
        }
    }
    return false;
}

//判断是否有一个角和自身颜色一样，有就返回true
function judgeTow(new_wx, new_wy, new_i, new_j, allChess, model, color) {
    if (!outLine(new_wx, new_wy)) {
        if (modelOutLine(new_i, new_j)) {
            if (allChess[new_wx][new_wy] == color) {
                return true;
            }
        } else if (model[new_j][new_i] != 1) {
            if (allChess[new_wx][new_wy] == color) {
                return true;
            }
        }
    }
    return false;
}


//下棋判断函数
function judgeSecond(x, y, allChess, model, color) {
    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 5; i++) {
            if (model[j][i] == 1) {
                var wx = x - 2 + i;
                var wy = y - 2 + j;
                console.log(wx + "++" + wy);
                if (outLine(wx, wy)) {
                    console.log("出界");
                    return false;
                }
                if (allChess[wx][wy] != 0) {
                    return false;
                }
                if (allChess[wx][wy] == 0) {
                    if (judgeOne(wx + 1, wy, i + 1, j, allChess, model, color)) {
                        return false;
                    }
                    if (judgeOne(wx, wy - 1, i, j - 1, allChess, model, color)) {
                        return false;
                    }
                    if (judgeOne(wx, wy + 1, i, j + 1, allChess, model, color)) {
                        return false;
                    }
                    if (judgeOne(wx - 1, wy, i - 1, j, allChess, model, color)) {
                        return false;
                    }
                }
            }
        }
    }
    console.log("第一阶段判断成功");
    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 5; i++) {
            if (model[j][i] == 1) {
                var wx = x - 2 + i;
                var wy = y - 2 + j;

                if (judgeTow(wx + 1, wy + 1, i + 1, j + 1, allChess, model, color)) {
                    return true;
                }
                if (judgeTow(wx - 1, wy + 1, i - 1, j + 1, allChess, model, color)) {
                    return true;
                }
                if (judgeTow(wx + 1, wy - 1, i + 1, j - 1, allChess, model, color)) {
                    return true;
                }
                if (judgeTow(wx - 1, wy - 1, i - 1, j - 1, allChess, model, color)) {
                    return true;
                }
            }
        }
    }
    console.log("第二阶段判断成功");
    return false;
}