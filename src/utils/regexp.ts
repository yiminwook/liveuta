/** 괄호삭제 */
export const replaceParentheses = (string: string) => {
  return string.replace(/【(.*?)】|〖(.*?)〗|\[(.*?)\]|\((.*?)\)/gi, '').trim();
};

/** 특수문자 입력방지, 띄어쓰기는 한번만 */
export const replaceSpecialCharacters = (string: string) => {
  return string.replace(/[{}[\]/?.,;:|)*~`!^-_+<>@#$%&\\=('"]/gi, '').replace(/\s{2}/gi, ' ');
};

export const addEscapeCharacter = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * 유투브 URL인지 검사
 * https://regexr.com/8abui
 * @param {string} url 유튜브 URL
 * @returns {boolean} 유효한 유튜브 URL인지 여부
 */
export const testYoutubeUrl = (url: string) => {
  return /^((?:https?:)?(?:\/\/)?)?((?:www|m)\.)?((?:youtube\.com|youtu.be))\/(?:embed\/|v\/|live\/|shorts\/|feeds\/api\/videos\/|watch\?v=|watch\?.+&v=)?([\w\-]{11})(\S+)?$/.test(
    url,
  );
};
