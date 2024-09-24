// const gameOver = (res) => {
//   const _cells = arrayCellsButton();
//   cells.forEach((cell, i) => {
//     cell.forEach((btn, j) => {
//       if (btn === true) {
//         if (_cells[i][j].style != colorSubtitleText) {
//           _cells[i][j].style.backgroundColor = colorDestructiveText;
//           _cells[i][j].style.borderColor = colorDestructiveText;
//         }
//       }
//     })
//     notificationText.innerHTML = `Game Over! You ${res}. Play again?`;
//     notification.style.display = "flex";
//   })
// }

// notificationBtnYes.addEventListener("click", () => {

// })

// notificationBtnNo.addEventListener("click", () => {
  
// })


function gameOver(res) {
  tg.showConfirm(`Game Over! You ${res}. Play again?`, (confirmed) => {
    if (confirmed) {
      cells = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
      initGame();
    } else  tg.close();
  });
}
