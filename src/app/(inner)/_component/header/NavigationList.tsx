import { Session } from 'next-auth';
import DropDown from '../dropDown/DropDown';
import { ExternalLinkList } from '../sidebar/ExternalLinksSection';
import { IndexLinkList } from '../sidebar/IndexSection';

type NavigationListProps = {
  session: Session | null;
};

export default function NavigationList({ session }: NavigationListProps) {
  return (
    <ul>
      <li>
        <DropDown title="목차" width="8.5rem" height="3.5rem">
          <IndexLinkList />
        </DropDown>
      </li>
      <li>
        <DropDown title="외부링크" width="8.5rem" height="3.5rem">
          <ExternalLinkList />
        </DropDown>
      </li>
    </ul>
  );
}
