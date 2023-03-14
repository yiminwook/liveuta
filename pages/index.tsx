import home from "@/styles/Home.module.scss";
import { NextPage } from "next";
import axios, { AxiosResponse } from "axios";
import ServiceLayout from "../components/service_layout";
import Link from "next/link";
import { UpcomingData } from "../models/sheet/in_sheet";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

interface Props {}

const Home: NextPage<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [contents, setContents] = useState<UpcomingData[]>([]);

  useEffect(() => {
    getContents();
  }, []);

  const getContents = async () => {
    try {
      const result: AxiosResponse<{ total: number; upcoming: UpcomingData[] }> =
        await axios.get("/api/sheet/upcoming");
      if (result.status === 200 && result.data.total > 0) {
        const { total, upcoming } = result.data;
        setTotal((_pre) => total);
        setContents((_pre) => [...upcoming]);
      }
      setIsLoading((_pre) => false);
    } catch (err) {
      console.error(err);
      setIsLoading((_pre) => false);
    }
  };

  return (
    <>
      <ServiceLayout title="LiveUta Home">
        {isLoading ? (
          <Loading />
        ) : (
          <main className={home.main}>
            {total > 0 && (
              <div className={home.total}>
                <div>{`Total: ${total}`}</div>
              </div>
            )}
            <div className={home.contents}>
              {contents.length > 0 &&
                contents.map((data) => {
                  return (
                    <div className={home.youtube__container} key={data.videoId}>
                      <div className={home.youtube_content__container}>
                        <div className={home.youtube_thumnail__container}>
                          <Link href={data.url ?? ""}>
                            <Image
                              src={data.thumbnailUrl}
                              width={480}
                              height={360}
                              alt="thumbnail"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="/thumbnail_alt_img.jpg"
                            ></Image>
                          </Link>
                        </div>
                        <div className={home.youtube_description}>
                          <div className={home.youtube_channel_name}>
                            {data.channelName ?? "no channel name"}
                          </div>
                          <div className={home.youtube_title}>
                            {data.title ?? "no title"}
                          </div>
                          <Link
                            className={home.youtube_link}
                            href={data.url ?? ""}
                          >
                            {data.url ?? "no url"}
                          </Link>
                          <div className={home.youtube_time__container}>
                            <div className={home.youtube_time__kor}>
                              {data.korTime ?? "no sheduled time"}
                            </div>
                            <div className={home.youtube_time__inter}>
                              {data.iterval ? `(${data.iterval})` : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </main>
        )}
      </ServiceLayout>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   try {
//     return {
//       props: {
//       },
//     };
//   } catch (err) {
//     console.error(err);
//     return {
//       props: {
//       },
//     };
//   }
// };

export default Home;
