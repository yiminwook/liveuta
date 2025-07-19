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

/**
 * 유투브 채널 URL인지 검사
 * @param {string} url 유튜브 채널 URL
 * @returns {boolean} 유효한 유튜브 채널 URL인지 여부
 */
export const testYoutubeChannelUrl = (url: string) => {
  // https://www.youtube.com/@MEMENTOVANITAS
  // https://www.youtube.com/channel/UCO5MA_Dr1o6I0IPQZ6tp_6w
  //
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(channel\/[a-zA-Z0-9_-]{24}|@[\w-]+)$/.test(
    url,
  );
};
