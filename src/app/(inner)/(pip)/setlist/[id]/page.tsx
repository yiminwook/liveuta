import Home from './_component/Home';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  return <Home params={params} />;
}
