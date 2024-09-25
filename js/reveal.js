const revealMine = (e, x, y) => {
  if (e.target.id === '') {
    if (parseInt(labelMine.innerHTML) >= 1) {
      e.target.id = "close";
      e.target.style.backgroundColor = colorSubtitleText;
      e.target.style.borderColor = colorSubtitleText;

      labelMine.innerHTML = `${parseInt(labelMine.innerHTML) - 1}`;
      markedMinesHint.innerHTML = `${mineCount - parseInt(labelMine.innerHTML)}`;

      if (cells[x][y] === true) trueMines.push([x,y]);
    }
  } else if (e.target.id === "close") {
    e.target.id = '';
    e.target.style.backgroundColor = colorAccentText;
    e.target.style.borderColor = colorAccentText;

    labelMine.innerHTML = `${parseInt(labelMine.innerHTML) + 1}`;

    if (cells[x][y] === true) {
      const index = array.findIndex(item => item[0] === x && item[1] === y);
      trueMines.slice(index, 1);
    }
  }
}

const revealCell = (e, x, y) => {
  if (inputMine.checked === true) revealMine(e, x, y);
  else {
    if (e.target.id === '') {
      if (cells[x][y]) {
        const _cells = arrayCellsButton();
        cells.forEach((cell, i) => {
          cell.forEach((btn, j) => {
            if (btn === true) {
              _cells[i][j].innerHTML = '☢';
              _cells[i][j].style.color = colorButton;
              _cells[i][j].style.backgroundColor = colorDestructiveText;
              _cells[i][j].style.borderColor = colorDestructiveText;
            }
          })
        })
        gameOver("lose");
      } else {
        if (e.target.style.backgroundColor !== colorButton) {
          trueCells--;
          openedCellsHint.innerHTML = `${trueCells}`;
        }

        e.target.style.backgroundColor = colorButton;
        e.target.style.borderColor = colorButton;
        e.target.style.opacity = "1";
    
        const minesAround = findMinesAround(x, y);
        if (minesAround >= 1) {
          e.target.innerHTML = minesAround;
          e.target.id = "open";
        } else {
          findMinesAroundEmpty(x, y);
        }
      }
    }
  }

  if ((trueMines.length === mineCount) || (trueCells === 0)) gameOver("win");
}
