import FasStar from '@icons/fa-solid/Star';
import { ActionIcon } from '@mantine/core';

type ToggleFavoriteProps = {
  isFavorite: boolean;
  onClick: () => void;
};

export default function ToggleFavorite({ isFavorite, onClick }: ToggleFavoriteProps) {
  return (
    <ActionIcon onClick={onClick} size="lg" w={40} h={40} variant="default">
      <FasStar color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
    </ActionIcon>
  );
}
