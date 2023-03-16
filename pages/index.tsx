import { GetStaticProps, NextPage } from "next";
import axios, { AxiosResponse } from "axios";
import ServiceLayout from "../components/service_layout";
import { UpcomingData } from "../models/sheet/in_sheet";
import getBaseUrl from "@/utils/get_base_url";
import home from "@/styles/Home.module.scss";
import Youtube_content from "@/components/youtube_content";

interface Props {
  total: number;
  upcoming: UpcomingData[];
}

const Home: NextPage<Props> = ({ total, upcoming }) => {
  return (
    <>
      <ServiceLayout title="LiveUta Home">
        <main className={home.main}>
          {total > 0 && (
            <div className={home.total}>
              <div>{`Total: ${total}`}</div>
            </div>
          )}
          <div className={home.contents}>
            {upcoming.length > 0 &&
              upcoming.map((data) => {
                return <Youtube_content key={data.videoId} contents={data} />;
              })}
          </div>
        </main>
      </ServiceLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const baseUrl = getBaseUrl(true);
    const result: AxiosResponse<{ total: number; upcoming: UpcomingData[] }> =
      await axios.get(`${baseUrl}/api/sheet/upcoming`);
    if (result.status !== 200) {
      return {
        props: {
          total: 0,
          upcoming: [],
        },
        revalidate: 30,
      };
    }

    const { total, upcoming } = result.data;
    return {
      props: {
        total,
        upcoming,
      },
      revalidate: 30,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        total: 0,
        upcoming: [],
      },
      revalidate: 30,
    };
  }
};

export default Home;
