export const clipText = (string: string) => {
  window.navigator.clipboard.writeText(string);
};
