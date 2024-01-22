import PlayerWrap from '@/components/common/player/PlayerWrap';
import { ContentsDataType, SheetAPIReturntype } from '@/types/inSheet';
import styled from '@emotion/styled';

const TopSectionBox = styled.section`
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
`;

interface TopSectionProps {
  isLoad: boolean;
  contents: ContentsDataType[];
  isMobile: boolean;
  isDesktop: boolean;
  filter: keyof SheetAPIReturntype;
}

const TopSection = ({ filter, isLoad, isMobile, isDesktop, contents }: TopSectionProps) => {
  if (filter !== 'live' || isMobile || isLoad === false) return null;

  return (
    <TopSectionBox>
      <PlayerWrap isDesktop={isDesktop} />
    </TopSectionBox>
  );
};

export default TopSection;
