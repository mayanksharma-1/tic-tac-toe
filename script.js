function gameBoard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  function Player(option, board) {
    function isValid(x, y) {
      return (
        x >= 0 &&
        x <= 2 &&
        y >= 0 &&
        y <= 2 &&
        board[x][y] == null
      );
    }

    function select(x, y) {
      if (isValid(x, y)) {
        board[x][y] = option;
        console.log(`player chose to place ${option} to ${x},${y}`);
        return true; 
      } else {
        console.log(`Invalid move. Please enter valid coordinates (0-2).`);
        return false; 
      }
    }

    return {
      select,
      option,
    };
  }

  function checkTie(board) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          return false; 
        }
      }
    }
    return true;
  }

  function checkWinner(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return { keepPlaying: false, winner: board[i][0] };
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return { keepPlaying: false, winner: board[0][i] };
      }
    }

    // Check diagonals
    if (
      (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
      (board[2][0] && board[2][0] === board[1][1] && board[1][1] === board[0][2])
    ) {
      return { keepPlaying: false, winner: board[1][1] };
    }

    if (checkTie(board)) {
      return { keepPlaying: false, winner: "tie" };
    }

    return { keepPlaying: true, winner: null };
  }

  return {
    board,
    Player,
    checkWinner,
  };
}

(function game() {
  const board = gameBoard();
  const playerO = board.Player("O", board.board);
  const playerX = board.Player("X", board.board);
  const PlayerList = [playerX, playerO];

  for (let index = 0; index < 9; index++) {
    index = index % 2;
    const currentPlayer = PlayerList[index];
    console.log(`its ${currentPlayer.option}'s turn`);

    let validMove = false;
    while (!validMove) {
      const xCoordinate = parseInt(prompt(`X coordinate for ${currentPlayer.option} please (0-2)`));
      const yCoordinate = parseInt(prompt(`Y coordinate for ${currentPlayer.option} please (0-2)`));
      validMove = currentPlayer.select(xCoordinate, yCoordinate);
    }

    console.log(board.board); 

    const win = board.checkWinner(board.board);
    if (!win.keepPlaying) {
      console.log(`GAME OVER!!!`);
      if (win.winner === "tie") {
        console.log(`THE MATCH ENDS IN A TIE`);
      } else {
        console.log(`THE WINNER IS ${win.winner} `);
      }
      break;
    }
  }
})();