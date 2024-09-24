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
      if (cells[x][y]) gameOver("lose");
      else {
        if (e.target.style.backgroundColor !== colorButton) {
          trueCells--;
          openedCellsHint.innerHTML = `${trueCells}`;
        }

        e.target.style.backgroundColor = colorButton;
        e.target.style.borderColor = colorButton;
    
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
