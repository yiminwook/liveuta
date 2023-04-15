import { GetStaticProps, NextPage } from "next";
import axios, { AxiosResponse } from "axios";
import { UpcomingData } from "../models/sheet/in_sheet";
import home from "@/styles/Home.module.scss";
import Youtube_content from "@/components/youtube_content";
import getBaseUrl from "@/utils/get_base_url";

interface Props {
  total: number;
  upcoming: UpcomingData[];
}

const Home: NextPage<Props> = ({ total, upcoming }) => {
  return (
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
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const baseURL = getBaseUrl(true);
    const result: AxiosResponse<{ total: number; upcoming: UpcomingData[] }> =
      await axios.get(`${baseURL}/api/sheet/upcoming`);

    const { total, upcoming } = result.data;
    return {
      props: {
        total,
        upcoming,
      },
      revalidate: 5,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        total: 0,
        upcoming: [],
      },
      revalidate: 5,
    };
  }
};
