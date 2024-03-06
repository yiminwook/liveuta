import convertTimeToSec from './convertTimeToSec';

type wrapTimeWithLinkProps = {
  text: string;
  baseUrl: string;
};

const wrapTimeWithLink = ({ text, baseUrl }: wrapTimeWithLinkProps) => {
  // 정규표현식을 사용하여 시간 문자열을 찾음
  const regex = /(?:^|\b)(\d{1,2}):(\d{2}):(\d{2})|(\d{1,2}):(\d{2})(?=\b|$)/g;
  const replacedText = text.replace(regex, (match) => {
    const seconds = convertTimeToSec(match); // 시간을 초로 환산
    return `<a href="${baseUrl}&t=${seconds}">${match}</a>`; // <a> 태그로 감싸고 초로 환산한 값을 URL에 추가
  });
  return replacedText;
};

export default wrapTimeWithLink;
