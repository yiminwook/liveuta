import { ExternalLinkList } from '@/components/layout/sidebar/ExternalLinksSection';
import DropDown from '@/components/common/dropDown/DropDown';
import ThemeButton from '@/components/common/button/ThemeButton';
import { IndexLinkList } from '@/components/layout/sidebar/IndexSection';

const NavigationList = () => {
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
      <li>
        <ThemeButton />
      </li>
    </ul>
  );
};

export default NavigationList;
