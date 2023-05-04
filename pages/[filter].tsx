import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import HomePage, { HomePageProps } from '@/pages';
import { HOME_FILTER } from '@/consts';

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

  let filterProps = 'scheduled';

  if (HOME_FILTER.indexOf(filter) >= 0) {
    filterProps = filter;
  }

  return {
    props: {
      filter: filterProps as HomePageProps['filter'],
    },
  };
};
