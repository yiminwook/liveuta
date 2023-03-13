import home from "@/styles/Home.module.scss";
import { NextPage, GetServerSideProps } from "next";
import axios, { AxiosResponse } from "axios";
import getBaseUrl from "@/utils/get_base_url";
import ServiceLayout from "../components/service_layout";
import Link from "next/link";
import { UpcomingData } from "../models/sheet/in_sheet";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  // total: number;
  // upcoming: UpcomingData[];
}

const Home: NextPage<Props> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [contents, setContents] = useState<UpcomingData[]>([]);

  useEffect(() => {
    getContents();
  }, []);

  const getContents = async () => {
    try {
      setIsLoading((_pre) => true);
      const result: AxiosResponse<{ total: number; upcoming: UpcomingData[] }> =
        await axios.get("/api/sheet/upcoming");
      if (result.status === 200 && result.data.total > 0) {
        console.log(result);
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
        <main className={home.main}>
          {isLoading ? (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                fontSize: "2rem",
                backgroundColor: "rgba(0,0,0,0.5)",
                width: "100vw",
                height: "100vh",
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "100vh",
              }}
            >
              Loading...
            </div>
          ) : (
            <>
              <div className={home.total}>
                {total ? `Total: ${total}` : "검색된 결과가 없습니다."}
              </div>
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
                              height={380}
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
            </>
          )}
        </main>
      </ServiceLayout>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   try {
//     const baseUrl = getBaseUrl(true);
//     const result: AxiosResponse<{ total: number; upcoming: UpcomingData[] }> =
//       await axios.get(`${baseUrl}/api/sheet/upcoming`);

//     if (result.status !== 200 && result.data.total > 0) {
//       return {
//         props: {
//           total: 0,
//           upcoming: [],
//         },
//       };
//     }

//     const { total, upcoming } = result.data;
//     return {
//       props: {
//         total,
//         upcoming,
//       },
//     };
//   } catch (err) {
//     console.error(err);
//     return {
//       props: {
//         total: 0,
//         upcoming: [],
//       },
//     };
//   }
// };

export default Home;
