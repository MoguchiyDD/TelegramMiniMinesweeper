const mineCount = 10;
const gridSize = 9;
let mines = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

const fillCounts = () => {
  document.getElementById("countMines").innerHTML += mineCount;
  document.getElementById("countCells").innerHTML += gridSize * gridSize;
  document.getElementById("game").style.gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`;
  document.getElementById("game").style.gridTemplateRows = `repeat(${gridSize}, minmax(0, 1fr))`;
}

const initGame = () => {
  const game = document.getElementById("game");
  game.innerHTML = '';

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
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.onclick = (e) => revealCell(e, i, j);
      game.appendChild(cell);
    }
  }
}

const revealCell = (e, x, y) => {
  console.log(mines);
  if (mines[x][y]) {
    alert("Game Over! You hit a mine.");
    initGame();  // reboot
  } else {
    console.log(e);
    e.style.backgroundColor = "var(--tg-theme-accent-text-color)";
  }
}

fillCounts();
initGame();
