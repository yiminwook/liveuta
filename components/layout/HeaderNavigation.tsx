import { ExternalLinkList } from '@/components/layout/sidebar/ExternalLinksSection';
import DropDown from '@/components/common/dropDown/DropDown';
import DarkModeButton from '@/components/common/button/DarkModeButton';
import styled from 'styled-components';
import { IndexLinkList } from '@/components/layout/sidebar/IndexSection';

const StyledHeaderNavigation = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderNavigation = () => {
  return (
    <StyledHeaderNavigation>
      <li>
        <DropDown title="목차" width="8.5rem">
          <IndexLinkList />
        </DropDown>
      </li>
      <li>
        <DropDown title="외부링크" width="8.5rem">
          <ExternalLinkList />
        </DropDown>
      </li>
      <li>
        <DarkModeButton />
      </li>
    </StyledHeaderNavigation>
  );
};

export default HeaderNavigation;
