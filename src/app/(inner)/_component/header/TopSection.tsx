import { ContentsDataType, MongoDBAPIReturntype } from '@/type/inMongoDB';
import styled from '@emotion/styled';
import PlayerWrap from '../player/PlayerWrap';

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
  filter: keyof MongoDBAPIReturntype;
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
