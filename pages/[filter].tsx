import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import HomePage, { HomePageProps } from '@/pages';
import { HOME_FILTER } from '@/const';

const HomeWithFilterPage = ({ filter }: HomePageProps) => {
  return <HomePage filter={filter} />;
};

export default HomeWithFilterPage;

interface HomeWithFilterPageParams extends ParsedUrlQuery {
  filter: string;
}

export const getServerSideProps: GetServerSideProps<HomePageProps, HomeWithFilterPageParams> = async ({
  res,
  params,
}) => {
  const { filter } = params!;

  if (HOME_FILTER.indexOf(filter) === -1) {
    res.setHeader('Location', '/');
    res.statusCode = 308;
    res.end();
  }

  return { props: { filter: filter as HomePageProps['filter'] } };
};
