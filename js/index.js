const tg = window.Telegram.WebApp;
// const userID = tg.initDataUnsafe.user.id;
// const userFirstName = tg.initDataUnsafe.user.first_name;
// const userLastName = tg.initDataUnsafe.user.lasr_name;

const inputMine = document.getElementById("mine");
const labelMine = document.getElementById("labelMine").getElementsByTagName("span")[0];
const markedMinesHint = document.getElementById("markedMines").getElementsByTagName("span")[0];
const openedCellsHint = document.getElementById("openedCells").getElementsByTagName("span")[0];

const mineCount = 10;
const gridSize = 9;
const gridSizeDouble = gridSize * gridSize;
const axys = [
  [-1, 1], [0, 1], [1, 1], [1, 0],
  [1, -1], [0,-1], [-1,-1], [-1,0]
];
let cells = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
let trueMines = [];
let trueCells = gridSizeDouble - mineCount;


const fillCounts = () => {
  document.getElementById("countMines").innerHTML += mineCount;
  document.getElementById("countCells").innerHTML += gridSizeDouble;
  document.getElementById("game").style.gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`;
  document.getElementById("game").style.gridTemplateRows = `repeat(${gridSize}, minmax(0, 1fr))`;
}

const initGame = () => {
  trueCells = gridSizeDouble - mineCount;
  labelMine.innerHTML = mineCount;
  markedMinesHint.innerHTML = 0;
  openedCellsHint.innerHTML = trueCells;

  cells.forEach((btn, _) => {
    if (btn === true) {
      btn.style.backgroundColor = colorAccentText;
      btn.style.borderColor = colorAccentText;
    }
  })

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

document.addEventListener("DOMContentLoaded", () => {
  tg.ready();
  fillCounts();
  initGame();
  // connectWebSocket(userID, userFirstName, userLastName);
})
