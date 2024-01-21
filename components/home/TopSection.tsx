import styled from '@emotion/styled';
import PlayerWrap from '@/components/common/player/PlayerWrap';

const TopSectionBox = styled.section`
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
`;

const TopSection = () => {
  return (
    <TopSectionBox>
      <PlayerWrap />
    </TopSectionBox>
  );
};

export default TopSection;
