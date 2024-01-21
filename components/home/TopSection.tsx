import PlayerWrap from '@/components/common/player/PlayerWrap';
import { ContentsDataType } from '@/types/inSheet';
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
  isTablet: boolean;
}

const TopSection = ({ isLoad, isMobile, isTablet, contents }: TopSectionProps) => {
  if (isMobile || isLoad === false) return null;

  return (
    <TopSectionBox>
      <PlayerWrap contents={contents} isTablet={isTablet} />
    </TopSectionBox>
  );
};

export default TopSection;
