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
                  <YouTube
                    videoId={videoId}
                    title={data.title ?? "no title"}
                    opts={{
                      // width: "560",
                      // height: "315",
                      playerVars: {
                        autoplay: 0, //자동재생 O
                        modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                      },
                    }}
                    //이벤트 리스너
                    onEnd={(e) => {
                      e.target.stopVideo(0);
                    }}
                  />
                </div>
                <div>{data.title ?? "no title"}</div>
                <Link href={data.url ?? ""}>{data.url ?? "no url"}</Link>
                <div>{data.channelName ?? "no channel name"}</div>
                <div>{data.scheduledTime ?? "no sheduled time"}</div>
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
