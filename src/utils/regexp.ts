/** 괄호삭제 */
export const replaceParentheses = (string: string) => {
  return string.replace(/\【(.*?)\】|\〖(.*?)\〗|\[(.*?)\]|\((.*?)\)/gi, '').trim();
};

/** 특수문자 입력방지, 띄어쓰기는 한번만 */
export const replaceSpecialCharacters = (string: string) => {
  return string
    .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '')
    .replace(/\s{2}/gi, ' ');
};

export const addExcapeCharacter = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
