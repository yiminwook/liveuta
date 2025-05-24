import Home from '@/components/channelInfo/home';
import Background from '@/components/common/background/Background';

type Props = {
  params: Promise<{ channelId: string }>;
};

export default async function Page({ params }: Props) {
  const { channelId } = await params;

  return (
    <Background>
      <Home channelId={channelId} />
    </Background>
  );
}
