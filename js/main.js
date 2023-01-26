

'use strict'

const MINE = 'MINE'
const MINE_IMG = '<img src="img/mine.jpg">'
var gBoard
var elBoard
var minesAroundCount
//gameStart
function onInit() {
    gBoard = buildBoard(8)
    addMines(4)
    elBoard = renderBoard(gBoard)
//console.log(elboard)
    //console.table(gBoard)
}

// buildingBoard
function buildBoard() {
    const rowCount = 4
    const colCount = 4
    const board = []
    for (var i = 0; i < rowCount; i++) {
        board[i] = []
        for (var j = 0; j < colCount; j++) {
            board[i][j] = { 
                 gameElement: null,
                 isShown: false,
                  isMine: false, 
                 isMarked: false }
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
            var elCell = board[i][j]
            minesAroundCount = countNegs(i,j,gBoard)
            var tdId = `cell-${i}-${j}`
            strHTML += `<td id="${tdId}" class="cell" onclick="onCellClick(${i},${j})">`
            if (elCell.isMarked) strHTML += '<span>M</span>';
            if (elCell.gameElement === MINE) strHTML += `<img src="img/mine.jpg" class="hide">`;
            strHTML += `<span class="hide">${minesAroundCount}</span>`
        }
        strHTML += '</td>'
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
    return elBoard
}

//clicking on cell
function onCellClick(i, j) {
    markCell(i, j);
    var negsCount = countNegs(i,j,gBoard);
    console.log(gBoard[i][j])
    if (gBoard[i][j].gameElement === MINE && gBoard[i][j].gameElement !== null) {
        var cellId = `cell-${i}-${j}`;
        var elImg = document.getElementById(cellId).querySelector('img');
        elImg.classList.remove('hide');
        checkGameOver();
    }
    
    if(minesAroundCount >= 0) {
        var cellId = `cell-${i}-${j}`;
        var elCell = document.getElementById(cellId);
        elCell.querySelector('span').classList.remove('hide');
    }
    return negsCount;
}
// addingMine
function addMine() {
    var emptyPos = getEmptyPos();
    gBoard[emptyPos.i][emptyPos.j].gameElement = MINE;
}
// addingMines
function addMines(num) {
    for (var i = 0; i < num; i++) {
        addMine();
    }
}
//randmoizing num- to mines. also runs on gboard so its not in util.
function getEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].gameElement) emptyPoss.push({ i, j })
        }
    }
    var randIdx = getRandomInt(0, emptyPoss.length)
    return emptyPoss[randIdx]
}
//counts neighbours around mines.
function countNegs(cellI, cellJ, board) {
    var minesAroundCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === cellI && j === cellJ) continue  
            var currCell = board[i][j]   
            if (currCell.gameElement === MINE) minesAroundCount++;
        }
 }
 return minesAroundCount
}
//alerting game over
function checkGameOver() {
    alert('YouLose')
}
//marking cell. still in work
function markCell(i, j) {
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked;
}


//footer = Ican'tCodeForTheLifeOfMe.AdirDavid 26/1/2023