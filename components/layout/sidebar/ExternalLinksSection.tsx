import { RxLink2 } from 'react-icons/rx';
import { ReactNode } from 'react';

const ExternalLink = ({ href, text }: { href: string; text: ReactNode }) => {
  return (
    <li>
      <a href={href}>{text}</a>
    </li>
  );
};

export const ExternalLinkList = () => {
  return (
    <ul>
      <ExternalLink href="https://gall.dcinside.com/mgallery/board/lists?id=kizunaai" text="키즈나아이 갤러리" />
      <ExternalLink href="https://gall.dcinside.com/mini/board/lists?id=vuta" text="우타와꾸 갤러리" />
      <ExternalLink href="https://uta-tools.vercel.app" text="UtaTools" />
    </ul>
  );
};

const ExternalLinksSection = () => {
  return (
    <section>
      <h2>
        <RxLink2 size={'1rem'} color="inherit" />
        &nbsp;외부링크
      </h2>
      <ExternalLinkList />
    </section>
  );
};

export default ExternalLinksSection;
