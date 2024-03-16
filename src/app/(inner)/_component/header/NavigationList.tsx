import HeaderMenu from '../menu/HeaderMenu';

export default function NavigationList() {
  return (
    <ul>
      <li>
        <HeaderMenu
          title="목차"
          links={[
            { href: '/', text: '홈' },
            { href: '/search', text: '검색' },
            { href: '/channels', text: '채널조회' },
            { href: '/request', text: '채널요청' },
            { href: '/setlist', text: '세트리' },
            { href: '/dev', text: '개발' },
          ]}
        />
      </li>
      <li>
        <HeaderMenu
          title="외부링크"
          links={[
            {
              href: 'https://gall.dcinside.com/mgallery/board/lists?id=kizunaai',
              text: '키즈나아이 갤러리',
            },
            { href: 'https://gall.dcinside.com/mini/board/lists?id=vuta', text: '우타와꾸 갤러리' },
            { href: 'https://uta-tools.vercel.app', text: '우타툴즈' },
            { href: 'https://ezgif.com', text: 'EZ GIF' },
          ]}
        />
      </li>
    </ul>
  );
}
