'use strict'
const FLOOR = 'FLOOR'
const MINE = 'MINE'
const MINE_IMG = '<img src="img/mine.jpg">'
var gNegsCount = 0
var gBoard
//gameStart
function onInit() {
    gBoard = buildBoard()
    addMines(2)
    renderBoard(gBoard)

    //console.table(gBoard)
    console.log(gBoard)
}

// buildingBoard
function buildBoard() {
    // Put FLOOR everywhere
    const rowCount = 4
    const colCount = 4
    const board = []
    for (var i = 0; i < rowCount; i++) {
        board[i] = []
        for (var j = 0; j < colCount; j++) {
            board[i][j] = { type: FLOOR, gameElement: null }
        }
    }

    return board
}
// renderingBoard
function renderBoard(board) {

    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var cellClass = getClassName({ i: i, j: j }) + ''
            strHTML += `<td class="cell ${cellClass}" onclick="onClick(${i},${j})" cell.innertext ="${gNegsCount}" >`
            if (currCell.gameElement === MINE) strHTML += MINE_IMG;
        }
        strHTML += '</td>'

        strHTML += '</tr>'

        // console.log('strHTML', strHTML)
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
    return elBoard
}

// classBylocation
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}
// onclickCell

function onClick(i, j) {
    var negsCount = countGamerNegs(i, j);
    if (gBoard[i][j].gameElement === MINE) {
        gameOver();
    } else {
        gBoard[i][j].innerHTML = negsCount;
    }
    console.log(negsCount)
    return negsCount
}

// addingMine
function addMine() {
    var emptyPos = getEmptyPos();
    gBoard[emptyPos.i][emptyPos.j].gameElement = MINE;
}

function addMines(num) {
    for (var i = 0; i < num; i++) {
        addMine();
    }
}

function getEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].type === FLOOR && !gBoard[i][j].gameElement) {
                emptyPoss.push({ i, j })
            }
        }
    }
    var randIdx = getRandomInt(0, emptyPoss.length)
    return emptyPoss[randIdx]
}
function countGamerNegs() {
    var mineCount = 0;
    for (var i = gBoard.i - 1; i <= gBoard.i +1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = gBoard.j-1 ; j <= gBoard.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            var currCell = gBoard[i][j]
            if (currCell.gameElement === MINE) mineCount++;
        }
    }
    return mineCount
}
function gameOver() {
    alert('YouLose')
}