function gameBoard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  function Player(option, board) {
    function isValid(x, y) {
      return x >= 0 && x <= 2 && y >= 0 && y <= 2 && board[x][y] == null;
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
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return { keepPlaying: false, winner: board[i][0] };
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return { keepPlaying: false, winner: board[0][i] };
      }
    }

    // Check diagonals
    if (
      (board[0][0] &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) ||
      (board[2][0] &&
        board[2][0] === board[1][1] &&
        board[1][1] === board[0][2])
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

function game() {
  const board = gameBoard();
  const playerO = board.Player("O", board.board);
  const playerX = board.Player("X", board.board);
  const PlayerList = [playerX, playerO];
  let currentPlayerIndex = 0;
  let gameOver = false;

  let boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      if (gameOver) {
        return;
      }

      xCoordinate = parseInt(e.target.getAttribute("data-x-index")) - 1;
      yCoordinate = parseInt(e.target.getAttribute("data-y-index")) - 1;
      console.log(xCoordinate, yCoordinate);
      const currentPlayer = PlayerList[currentPlayerIndex];

      if (currentPlayer.select(xCoordinate, yCoordinate)) {
        e.target.innerHTML = currentPlayer.option;
        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        const win = board.checkWinner(board.board);
        if (!win.keepPlaying) {
          gameOver = true;
          alert(`GAME OVER!!!`);
          if (win.winner === "tie") {
            alert(`THE MATCH ENDS IN A TIE`);
          } else {
            alert(`THE WINNER IS ${win.winner} `);
          }
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  game();
});
