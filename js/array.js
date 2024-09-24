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
