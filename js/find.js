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

          if (button.style.backgroundColor !== colorButton) {
            trueCells--;
            openedCellsHint.innerHTML = `${trueCells}`;
          }

          button.style.backgroundColor = colorButton;
          button.style.borderColor = colorButton;
          button.style.opacity = "1";
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
};
