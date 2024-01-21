import styled from '@emotion/styled';
import Player from '@/components/common/Player';

const TopSectionBox = styled.section`
  margin: 0.5rem auto;
`;

const TopSection = () => {
  return (
    <TopSectionBox>
      <Player />
    </TopSectionBox>
  );
};

export default TopSection;
