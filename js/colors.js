const colorButton = "var(--tg-theme-button-color)";
const colorAccentText = "var(--tg-theme-accent-text-color)";
const colorSubtitleText = "var(--tg-theme-subtitle-text-color)";
const colorDestructiveText = "var(--tg-theme-destructive-text-color)";

const checkColorScheme = () => {
  const colorScheme = tg.getColorScheme();
  return colorScheme;
};

setInterval(checkColorScheme, 1000);
