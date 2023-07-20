export const deleteParentheses = (string: string) => {
  return string.replace(/\【(.*?)\】|\〖(.*?)\〗|\[(.*?)\]|\((.*?)\)/gi, '');
};
