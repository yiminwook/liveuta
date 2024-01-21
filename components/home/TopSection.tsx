import styled from '@emotion/styled';
import Player from '@/components/common/Player';

const TopSectionBox = styled.section`
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
`;

const TopSection = () => {
  return (
    <TopSectionBox>
      <Player />
    </TopSectionBox>
  );
};

export default TopSection;
