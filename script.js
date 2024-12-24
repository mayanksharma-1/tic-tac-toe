//TODO: make tic tac toe in terminal fist

var board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

// make a 3x3 board with null as default then make x and o as the actions 
// player1 and player2 as the objects maybe
function Player(name,option,board){
    function isValid(x,y) {
        return board[x][y]==null;
    }

    function select(x,y){
        if (isValid(x,y)){
            board[x][y] = option;
        }
        else {console.log(`The coordinate is already selected ${board[x][y]}`);}
    }
}