import { GetStaticProps, NextPage } from "next";
import axios, { AxiosResponse } from "axios";
import ServiceLayout from "../components/service_layout";
import { UpcomingData } from "../models/sheet/in_sheet";
import { useState } from "react";
// import Loading from "@/components/loading";
import getBaseUrl from "@/utils/get_base_url";
import home from "@/styles/Home.module.scss";
import Youtube_contents from "@/components/youtube_contents";

interface Props {
  total: number;
  upcoming: UpcomingData[];
}

const Home: NextPage<Props> = ({ total, upcoming }) => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [total, setTotal] = useState<number>(0));
  const [contents, _setContents] = useState<UpcomingData[]>(upcoming);

  // useEffect(() => {
  //   getContents();
  // }, []);

  // const getContents = async () => {
  //   try {
  //     const result: AxiosResponse<{ total: number; upcoming: UpcomingData[] }> =
  //       await axios.get("/api/sheet/upcoming");
  //     if (result.status === 200 && result.data.total > 0) {
  //       const { total, upcoming } = result.data;
  //       setTotal((_pre) => total);
  //       setContents((_pre) => [...upcoming]);
  //     }
  //     setIsLoading((_pre) => false);
  //   } catch (err) {
  //     console.error(err);
  //     setIsLoading((_pre) => false);
  //   }
  // };

  return (
    <>
      <ServiceLayout title="LiveUta Home">
        {/* {isLoading ? (
          <Loading />
        ) : ( */}
        <main className={home.main}>
          {total > 0 && (
            <div className={home.total}>
              <div>{`Total: ${total}`}</div>
            </div>
          )}
          <div className={home.contents}>
            {contents.length > 0 &&
              contents.map((data) => {
                return <Youtube_contents key={data.videoId} contents={data} />;
              })}
          </div>
        </main>
        {/* )} */}
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
