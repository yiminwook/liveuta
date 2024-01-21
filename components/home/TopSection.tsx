import PlayerWrap from '@/components/common/player/PlayerWrap';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';
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
}

const TopSection = ({ isLoad, contents }: TopSectionProps) => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isLoad === false) return null;

  return (
    <TopSectionBox>
      <PlayerWrap contents={contents} isTablet={isTablet} />
    </TopSectionBox>
  );
};

export default clientOnly(TopSection);
