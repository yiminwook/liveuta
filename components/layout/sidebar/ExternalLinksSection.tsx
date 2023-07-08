import { RxLink2 } from 'react-icons/rx';
import NavLink from '@/components/common/NavLink';

const ExternalLinksSection = () => {
  return (
    <section>
      <h2>
        <RxLink2 size={'1rem'} color="inherit" />
        &nbsp;외부링크
      </h2>
      <ul>
        <NavLink href="https://gall.dcinside.com/mgallery/board/lists?id=kizunaai">키즈나아이 갤러리</NavLink>
        <NavLink href="https://gall.dcinside.com/mini/board/lists?id=vuta">우타와꾸 갤러리</NavLink>
        <NavLink href="https://www.piku.co.kr/w/6js7eW">아이도루 월드컵</NavLink>
      </ul>
    </section>
  );
};

export default ExternalLinksSection;
