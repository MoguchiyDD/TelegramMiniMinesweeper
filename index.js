const mineCount = 10;
const gridSize = 9;
const axys = [
  [-1, 1], [0, 1], [1, 1], [1, 0],
  [1, -1], [0,-1], [-1,-1], [-1,0]
];
let cells = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

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
    } while (cells[x][y]);
    cells[x][y] = true;
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
  console.log(cells);
  if (cells[x][y]) {
    alert("Game Over! You hit a mine.");
    initGame();  // reboot
  } else {
    console.log(e);
    e.target.style.backgroundColor = "var(--tg-theme-section-header-text-color)";
    e.target.style.borderColor = "var(--tg-theme-section-header-text-color)";

    const minesAround = findMinesAround(x, y);
    if (minesAround >= 1) {
      e.target.innerHTML = minesAround;
    }
  }
}

const findMinesAround = (xstart, ystart) => {
  const x = xstart;
  const y = ystart;

  let countMinesAround = 0;
  let dotLoop = 0;

  while(dotLoop < axys.length) {
    try {
      console.log(x, y, ":", x + axys[dotLoop][0], y + axys[dotLoop][1], "-", countMinesAround);
      if (cells[x + axys[dotLoop][0]][y + axys[dotLoop][1]] === true) {
        countMinesAround++;
      }
    } catch (error) {
      console.log(error);
    }
    dotLoop++;
  }

  return countMinesAround;
}

fillCounts();
initGame();
