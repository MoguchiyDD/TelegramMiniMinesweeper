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
  if (cells[x][y]) {
    alert("Game Over! You hit a mine.");
    initGame();  // reboot
  } else {
    e.target.style.backgroundColor = "var(--tg-theme-section-header-text-color)";
    e.target.style.borderColor = "var(--tg-theme-section-header-text-color)";

    const minesAround = findMinesAround(x, y);
    if (minesAround >= 1) {
      e.target.innerHTML = minesAround;
    } else {
      findMinesAroundEmpty(x, y);
    }
  }
}

const arrayCellsButton = () => {
  const cellsButton = document.getElementsByClassName("cell");
  const countCells = Array.from({ length: gridSize + 1 }, (_, i) => (i + 1) * gridSize - 1);
  const arrayCellsButton = Array.from({ length: gridSize }, () => []);

  let indexArrayCellsButton = 0;
  Array.from(cellsButton).forEach((cell, i) => {
    arrayCellsButton[indexArrayCellsButton].push(cell);
    if (countCells.includes(i)) {
      indexArrayCellsButton++;
    }
  })

  return arrayCellsButton;
}

const findMinesAround = (xstart, ystart) => {
  let countMinesAround = 0;

  axys.forEach(offset => {
    const newX = xstart + offset[0];
    const newY = ystart + offset[1];

    if (newX < 0 || newY < 0 || newX >= cells.length || newY >= cells[0].length) return;
    if (cells[newX][newY] === true) countMinesAround++;
  })

  return countMinesAround;
}

const findMinesAroundEmpty = (xstart, ystart) => {
  const _cells = arrayCellsButton();
  const queue = [];
  const visited = new Set();

  let x = xstart;
  let y = ystart;
  queue.push([x, y]);

  while (queue.length > 0) {
    [x, y] = queue.shift();

    axys.forEach(offset => {
      const newX = x + offset[0];
      const newY = y + offset[1];

      if (newX < 0 || newY < 0 || newX >= cells.length || newY >= cells[0].length) return;
      if (visited.has(`${newX},${newY}`)) return;
      visited.add(`${newX},${newY}`);

      try {
        if (cells[newX][newY] === false) {
          const minesAround = findMinesAround(newX, newY);
          const button = _cells[newX][newY];

          minesAround === 0 ? queue.push([newX, newY]) : button.innerHTML = minesAround;

          button.style.backgroundColor = "var(--tg-theme-section-header-text-color)";
          button.style.borderColor = "var(--tg-theme-section-header-text-color)";
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
};

fillCounts();
initGame();
