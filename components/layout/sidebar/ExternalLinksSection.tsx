import { RxLink2 } from 'react-icons/rx';
import { ReactNode } from 'react';
import Link from 'next/link';

const ExternalLink = ({ href, text }: { href: string; text: ReactNode }) => {
  return (
    <li>
      <Link href={href}>{text}</Link>
    </li>
  );
};

export const ExternalLinkList = () => {
  return (
    <ul>
      <ExternalLink href="https://gall.dcinside.com/mgallery/board/lists?id=kizunaai" text="키즈나아이 갤러리" />
      <ExternalLink href="https://gall.dcinside.com/mini/board/lists?id=vuta" text="우타와꾸 갤러리" />
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
