//TODO: make tic tac toe in terminal fist

var board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

// make a 3x3 board with null as default then make x and o as the actions 
// player1 and player2 as the objects maybe
// maybe put board in a IIFE? 
function Player(name,option,board){
    function isValid(x,y) {
        return board[x][y]==null;
    }

    function select(x,y){
        if (isValid(x,y)){
            board[x][y] = option;
            console.log(`player ${name} chose to place ${option} to ${x},${y}`);
        }
        else {console.log(`The coordinate is already selected ${board[x][y]}`);}
    }
    return {
        select,
    }
}

function checkWinner(board){
    console.log("checking the board");
    for (let i = 0; i < 3; i++) {
        // checking verticals 
        console.log(`checking the verticals checking i = ${i}`);
        if (board[0][i]==board[1][i] && board[1][i]==board[2][i] && board[2][i]==board[0][i]) {
            return board[0][i]; // returns x or o that won the game
            
        }
        // checking horizontals
        console.log(`checking the horizontals checking i = ${i}`);
        
        if (board[i][0]==board[i][1] && board[i][1]==board[i][2] && board[i][2]==board[i][0]) {
            return board[i][0]; // returns x or o that won the game

        }
    }

    // checking diagonal
    if (board[0][0]==board[1][1]==board[2][2]) {
        return board[1][1];
    }
    if (board[2][0]==board[1][1]==board[2][0]) {
        return board[1][1];
    }
    else{
        return 'tie'
    }
}