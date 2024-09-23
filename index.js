const mineCount = 10;
const gridSize = 9;
let mines = [];

function initGame() {
  const game = document.getElementById("game");
  game.innerHTML = '';
  mines = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

  // mines
  for (let i = 0; i < mineCount; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * gridSize);
      y = Math.floor(Math.random() * gridSize);
    } while (mines[x][y]);
    mines[x][y] = true;
  }

  // cells
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.onclick = () => revealCell(i, j);
      game.appendChild(cell);
    }
  }
}

function revealCell(x, y) {
  if (mines[x][y]) {
    alert("Game Over! You hit a mine.");
    initGame();  // reboot
  } else {
    console.log(`Cell (${x}, ${y}) is safe.`);
  }
}

initGame();
