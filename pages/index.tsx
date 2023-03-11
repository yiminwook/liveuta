import home from "@/styles/Home.module.scss";
import { NextPage, GetServerSideProps } from "next";
import axios, { AxiosResponse } from "axios";
import getBaseUrl from "@/utils/get_base_url";
import ServiceLayout from "./components/service_layout";
import YouTube from "react-youtube";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Data {
  title: string;
  url: string;
  channelName: string;
  scheduledTime: string;
}

interface Props {
  sheetData: Data[];
}

const Home: NextPage<Props> = ({ sheetData }) => {
  const [renderingVideo, setRenderingVideo] = useState<Data[]>([]);
  const [page, setPage] = useState<number>(5);
  useEffect(() => {
    appendPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appendPage = () => {
    const appendArr: Data[] = [];
    for (let i = 0; i < 5; i++) {
      if (sheetData[i]) {
        appendArr.push(sheetData[i]);
      }
    }
    setRenderingVideo((_pre) => [...appendArr]);
  };

  const handlePage = () => {
    setPage((pre) => pre + 5);
    const appendIndex = Array.from(Array(5), (_, k) => page + k);
    const appendArr: Data[] = [];
    appendIndex.forEach((i) => {
      const { title, url, channelName, scheduledTime } = sheetData[i];
      if (title && url && channelName && scheduledTime) {
        appendArr.push(sheetData[i]);
      }
    });
    setRenderingVideo((pre) => [...pre, ...appendArr]);
  };

  return (
    <>
      <ServiceLayout title="LiveUta Home">
        <main className={home.main}>
          {renderingVideo.map((data) => {
            const videoId = data.url.replace(
              "https://www.youtube.com/watch?v=",
              ""
            );
            return (
              <div className={home.content_container} key={videoId}>
                <div className={home.youtube_container}>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className={home.youtube_title}>
                  {data.title ?? "no title"}
                </div>
                <Link className={home.youtube_link} href={data.url ?? ""}>
                  {data.url ?? "no url"}
                </Link>
                <div className={home.youtube_channel_name}>
                  {data.channelName ?? "no channel name"}
                </div>
                <div className={home.youtube_scheduledTime}>
                  {data.scheduledTime ?? "no sheduled time"}
                </div>
              </div>
            );
          })}
          {page < sheetData.length && (
            <div className={home.button} onClick={handlePage}>
              더보기
            </div>
          )}
        </main>
      </ServiceLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const baseUrl = getBaseUrl(true);
    const result: AxiosResponse<Data[]> = await axios.get(
      `${baseUrl}/api/sheet`
    );
    if (result.status !== 200 && result.data.length <= 0) {
      return {
        props: {
          sheetData: [],
        },
      };
    }

    const sheetData = result.data;
    return {
      props: {
        sheetData,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        sheetData: [],
      },
    };
  }
};

export default Home;
