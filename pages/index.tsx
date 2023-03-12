import home from "@/styles/Home.module.scss";
import { NextPage, GetServerSideProps } from "next";
import axios, { AxiosResponse } from "axios";
import getBaseUrl from "@/utils/get_base_url";
import ServiceLayout from "../components/service_layout";
import Link from "next/link";
import { useState } from "react";
import { UpcomingData } from "../models/sheet/in_sheet";
import Image from "next/image";

interface Props {
  total: number;
  upcoming: UpcomingData[];
}

const Home: NextPage<Props> = ({ total, upcoming }) => {
  const [contents, _setContents] = useState<UpcomingData[]>(upcoming);

  return (
    <>
      <ServiceLayout title="LiveUta Home">
        <main className={home.main}>
          <div className={home.total}>{`Total: ${total}`}</div>
          {contents.map((data) => {
            let title = data.title.replace(/\【(.*?)\】|\〖(.*?)\〗/gi, "");
            if (title.length > 40) {
              title = title.substring(0, 40) + "...";
            }
            return (
              <div className={home.youtube__container} key={data.videoId}>
                <div className={home.youtube_content__container}>
                  <div className={home.youtube_thumnail__container}>
                    <Link href={data.url ?? ""}>
                      <Image
                        src={data.thumbnailUrl}
                        width={480}
                        height={380}
                        alt="thumbail"
                      ></Image>
                    </Link>
                  </div>
                  <div className={home.youtube_description}>
                    <div className={home.youtube_channel_name}>
                      {data.channelName ?? "no channel name"}
                    </div>
                    <div className={home.youtube_title}>
                      {title ?? "no title"}
                    </div>
                    <Link className={home.youtube_link} href={data.url ?? ""}>
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
        </main>
      </ServiceLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const baseUrl = getBaseUrl(true);
    const result: AxiosResponse<{ total: number; upcoming: UpcomingData[] }> =
      await axios.get(`${baseUrl}/api/sheet/upcoming`);

    if (result.status !== 200 && result.data.total > 0) {
      return {
        props: {
          total: 0,
          upcoming: [],
        },
      };
    }

    const { total, upcoming } = result.data;
    return {
      props: {
        total,
        upcoming,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        total: 0,
        upcoming: [],
      },
    };
  }
};

export default Home;
