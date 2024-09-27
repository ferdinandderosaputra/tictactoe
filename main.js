let currentPlayer = "X";
let board = Array(9).fill(null);
let player1Score = 0;
let player2Score = 0;
let gameActive = true;

const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");
const currentPlayerDisplay = document.getElementById("current-player");
const resetButton = document.getElementById("reset-game");

resetButton.addEventListener("click", resetGame);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function makeMove(cell, index) {
  if (gameActive && !board[index]) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerDisplay.textContent = currentPlayer;
  }
}

function checkWinner() {
  let winner = null;

  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  });

  if (winner) {
    gameActive = false;
    updateScore(winner);
    Swal.fire({
      title: `Player ${winner} wins!`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      resetGame();
    });
  } else if (!board.includes(null)) {
    gameActive = false;
    Swal.fire({
      title: "It's a draw!",
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => {
      resetGame();
    });
  }
}

function updateScore(winner) {
  if (winner === "X") {
    player1Score++;
    player1ScoreDisplay.textContent = player1Score;
  } else if (winner === "O") {
    player2Score++;
    player2ScoreDisplay.textContent = player2Score;
  }
}

function resetGame() {
  board = Array(9).fill(null);
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.textContent = ""));
  gameActive = true;
  currentPlayer = "X";
  currentPlayerDisplay.textContent = currentPlayer;
  Swal.fire({
    title: `Game Reset`,
    icon: "success",
    confirmButtonText: "OK",
  });
}
