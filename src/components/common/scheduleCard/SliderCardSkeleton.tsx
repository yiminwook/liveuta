import { Box, Card, Skeleton } from '@mantine/core';
import css from './Card.module.scss';

export default function SliderCardSkeleton() {
  return (
    <Card className={css.sliderCard} padding="xs" shadow="xs" withBorder>
      <Card.Section>
        <Skeleton styles={{ root: { aspectRatio: '16 / 9' } }} radius={0} />
      </Card.Section>

      <Box mt="md">
        <Skeleton h="1.5rem" />
      </Box>

      <Box mt="md">
        <Skeleton h="1rem" />
        <Skeleton h="1rem" w="75%" mt="0.5rem" />
      </Box>

      <div className={css.navBox}>
        <Box h="2rem" />
      </div>
    </Card>
  );
}
