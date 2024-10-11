function gameOver(res) {
  tg.showConfirm(`Game Over! You ${res}. Play again?`, (confirmed) => {
    if (confirmed) {
      cells = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
      initGame();
    } else tg.close();
  });
}
