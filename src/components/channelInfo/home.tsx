import css from './home.module.scss';

type HomeProps = {
  channelId: string;
};

export default function Home({ channelId }: HomeProps) {
  return (
    <div>
      <h1>{channelId}</h1>
    </div>
  );
}
