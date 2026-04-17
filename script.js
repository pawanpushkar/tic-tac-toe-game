const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X"; // Human = X
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Add click listeners
cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;

  // Prevent overwrite or playing after game ends
  if (board[index] !== "" || !gameActive) return;

  // Human move
  makeMove(index, "X");

  // If game still active → Computer move
  if (gameActive) {
    setTimeout(computerMove, 400); // delay for realism
  }
}

// Common function to place move
function makeMove(index, player) {
  board[index] = player;
  cells[index].innerText = player;

  cells[index].classList.add(player); // add glow class

  checkWinner(player);
}

// Winner check
function checkWinner(player) {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] === player && board[b] === player && board[c] === player) {
      statusText.innerText = `Winner: ${player}`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.innerText = "Draw!";
    gameActive = false;
  }
}

// 🔥 COMPUTER AI (Smart Random)
function computerMove() {
  let emptyCells = board
    .map((val, i) => val === "" ? i : null)
    .filter(v => v !== null);

  if (emptyCells.length === 0) return;

  // Simple AI → random move
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  makeMove(randomIndex, "O");
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.innerText = "";

  cells.forEach(cell => cell.innerText = "");
}