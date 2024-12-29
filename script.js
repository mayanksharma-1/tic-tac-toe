//TODO: make tic tac toe in terminal fist

// make a 3x3 board with null as default then make x and o as the actions
// player1 and player2 as the objects maybe
// maybe put board in a IIFE?

function gameBoard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  function Player(option, board) {
    function isValid(x, y) {
      return board[x][y] == null;
    }

    function select(x, y) {
      if (isValid(x, y)) {
        board[x][y] = option;
        console.log(`player chose to place ${option} to ${x},${y}`);
      } else {
        console.log(`The coordinate is already selected ${board[x][y]}`);
      }
    }
    return {
      select,
      option
    };
  }


function checkWinner(board) {
    console.log("checking the board");
    for (let i = 0; i < 3; i++) {
      // checking verticals
      console.log(`checking the verticals checking i = ${i}`);
      if (
        board[0][i] == board[1][i] &&
        board[1][i] == board[2][i] &&
        board[2][i] == board[0][i]
      ) {
        return board[0][i]; // returns x or o that won the game
      }
      // checking horizontals
      console.log(`checking the horizontals checking i = ${i}`);
  
      if (
        board[i][0] == board[i][1] &&
        board[i][1] == board[i][2] &&
        board[i][2] == board[i][0]
      ) {
        return board[i][0]; // returns x or o that won the game
      }
    }
  
    // checking diagonal
    if ((board[0][0] == board[1][1]) == board[2][2]) {
      return board[1][1];
    }
    if ((board[2][0] == board[1][1]) == board[2][0]) {
      return board[1][1];
    } else {
      return "tie";
    }
  }
  
  return{
    board,
    Player,
    checkWinner
  }
}

(function game() {
    // TODO: make loop with a break condition that 
    // loop should alternates between player1 and player2 objects
    board = gameBoard();
    const playerO = board.Player("O",board.board);
    const playerX = board.Player("X",board.board);

    const PlayerList = [playerX,playerO];

    for (let index = 0; index < 9; index++) {
        index = index%2; // alternates between 0 and 1
        console.log(`index right now is ${index}`);
        const currentPlayer = PlayerList[index];
        console.log(board.board);
        console.log(`its ${currentPlayer.option}'s turn`);
        xCoordinate = prompt(`X coordinate for ${currentPlayer.option} please`);
        yCoordinate = prompt(`Y coordinate for ${currentPlayer.option} please`);
        currentPlayer.select(xCoordinate,yCoordinate);

        //break conditions: 
        // board is filled or winner is declared 
        console.log(`new index is ${index}`);
        
    }

})();