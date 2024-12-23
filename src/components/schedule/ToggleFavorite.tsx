import { ActionIcon } from '@mantine/core';
import { FaStar } from 'react-icons/fa';

type ToggleFavoriteProps = {
  isFavorite: boolean;
  onClick: () => void;
};

export default function ToggleFavorite({ isFavorite, onClick }: ToggleFavoriteProps) {
  return (
    <ActionIcon onClick={onClick} size="lg" w={40} h={40} variant="default">
      <FaStar color={isFavorite ? '#ffbb00' : '#a7a7a7'} />
    </ActionIcon>
  );
}
