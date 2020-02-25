var board=new Array();
var score=0;

$(document).ready(function (argument) {
	newgame()
})

function newgame(argument) {
	// 初始化棋盘格
	init()

	// 随机生成两个数字
	generateOneNumber()
	generateOneNumber()
}

function init(argument) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell=$('#grid-cell-'+i+'-'+j)
			gridCell.css('top',getPosTop(i,j))
			gridCell.css('left',getPosLeft(i,j))

		}
	}


	for (var i = 0; i < 4; i++) {
		board[i]=new Array()
		for (var j = 0; j < 4; j++) {
			board[i][j]=0
		}
	}

	updateBoardView()

}

function updateBoardView(argument) {
	$(".number-cell").remove()
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
			var theNumberCell=$('#number-cell-'+i+'-'+j)

			if (board[i][j]==0) {
				theNumberCell.css('width','0px')
				theNumberCell.css('height','0px')
				theNumberCell.css('top',getPosTop(i,j)+50)
				theNumberCell.css('left',getPosLeft(i,j)+50)

			}else{
				theNumberCell.css('width','100px')
				theNumberCell.css('height','100px')
				theNumberCell.css('top',getPosTop(i,j))
				theNumberCell.css('left',getPosLeft(i,j))
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]))
				theNumberCell.css('color',getNumberColor(board[i][j]))
				theNumberCell.text(board[i][j])

			}


		}
	}

}

function generateOneNumber(argument) {
	if (nospace(board)) {
		return false
	}

	// 随机一个位置（0-3）
	var randx = parseInt( Math.floor( Math.random()  * 4 ) )
    var randy = parseInt( Math.floor( Math.random()  * 4 ) )

    // 判断此位置是否已经有数字，如果有，则重新生成位置，直到此位置没有数字
    while(true){
    	if (board[randx][randy]==0) {
    		break
    	}

    	randx = parseInt( Math.floor( Math.random()  * 4 ) )
	    randy = parseInt( Math.floor( Math.random()  * 4 ) )
    }

    //随机一个2或4
    var randNumber = Math.random() < 0.5 ? 2 : 4

    //在随机位置显示随机数字
    board[randx][randy] = randNumber
    showNumberWithAnimation( randx , randy , randNumber )

	return true
}

$(document).keydown(function (event) {
	switch(event.keyCode){
		case 37: //left
            if( moveLeft() ){
                setTimeout('generateOneNumber()',210)
                setTimeout('isgameover()',300)
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout('generateOneNumber()',210)
                setTimeout('isgameover()',300)
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout('generateOneNumber()',210)
                setTimeout('isgameover()',300)
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout('generateOneNumber()',210)
                setTimeout('isgameover()',300)
            }
            break;
        default: //default
            break;
    
	}
})

function isgameover(argument) {
	if (nospace(board)&&nomove(board)) {
		gameover()
	}
}

function gameover(argument) {
	alert('gameover!')
}

function moveLeft(argument) {
	if (!canMoveLeft(board)) {
		return false

	}
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j]) {
				for (var k = 0; k < j; k++) {
					if (board[i][k]==0&&noBlockHorizontal(i,k,j,board)) {
						showMoveAnimation(i,j,i,k)
						board[i][k] = board[i][j]
                        board[i][j] = 0

						continue
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
						showMoveAnimation(i,j,i,k)
						board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score +=board[i][k]
                        updateScore(score)


						continue
					}
				}
			}

		}
	}

	setTimeout('updateBoardView()',200)

	return true
}

function moveRight(argument) {
	if (!canMoveRight(board)) {
		return false

	}
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >=0; j--) {
			if (board[i][j]) {
				for (var k = 3; k >j; k--) {
					if (board[i][k]==0&&noBlockHorizontal(i,j,k,board)) {
						showMoveAnimation(i,j,i,k)
						board[i][k] = board[i][j]
                        board[i][j] = 0

						continue
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k)
						board[i][k] *= 2
                        board[i][j] = 0

                        score +=board[i][k]
                        updateScore(score)


						continue
					}
				}
			}

		}
	}


	setTimeout('updateBoardView()',200)

	return true
}

function moveUp(argument) {
	if (!canMoveUp(board)) {
		return false

	}
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j]) {
				for (var k = 0; k < i; k++) {
					if (board[k][j]==0&&noBlockHorizontal(j,k,i,board)) {
						showMoveAnimation(i,j,k,j)
						board[k][j] = board[i][j]
                        board[i][j] = 0

						continue
					}
					else if(board[k][j]==board[i][j]&&noBlockHorizontal(j,k,i,board)){
						showMoveAnimation(i,j,k,j)
						board[k][j] *=2
                        board[i][j] = 0

                        score +=board[k][j]
                        updateScore(score)


						continue
					}
				}
			}

		}
	}


	setTimeout('updateBoardView()',200)

	return true
}

function moveDown(argument) {
	if (!canMoveDown(board)) {
		return false

	}
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >=0; i--) {
			if (board[i][j]) {
				for (var k = 3; k > i; k--) {
					if (board[k][j]==0&&noBlockHorizontal(j,i,k,board)) {
						showMoveAnimation(i,j,k,j)
						board[k][j] = board[i][j]
                        board[i][j] = 0

						continue
					}
					else if(board[k][j]==board[i][j]&&noBlockHorizontal(j,i,k,board)){
						showMoveAnimation(i,j,k,j)
						board[k][j] *=2
                        board[i][j] = 0

                        score +=board[k][j]
                        updateScore(score)


						continue
					}
				}
			}

		}
	}


	setTimeout('updateBoardView()',200)

	return true
}


