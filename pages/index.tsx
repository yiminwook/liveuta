import { NextPage } from "next";
import { UpcomingData } from "../models/sheet/in_sheet";
import home from "@/styles/Home.module.scss";
import YoutubeContent from "@/components/youtube_content";
import { useEffect, useState } from "react";
import useUpcomming from "@/hooks/useUpcomming";

interface IndexPageProps {
  total: number;
  upcoming: UpcomingData[];
}

const Home: NextPage<IndexPageProps> = () => {
  const [total, setTotal] = useState<number>(0);
  const [contents, setContents] = useState<UpcomingData[]>([]);

  const { data } = useUpcomming();

  useEffect(() => {
    if (data) {
      const { total, upcoming } = data;
      setTotal(() => total);
      setContents(() => upcoming);
    }
  }, [data]);

  return (
    <main className={home.main}>
      {total > 0 && (
        <div className={home.total}>
          <div>{`Total: ${total}`}</div>
        </div>
      )}
      <section className={home.contents}>
        {contents.map((data) => (
          <YoutubeContent key={data.videoId} contents={data} />
        ))}
      </section>
    </main>
  );
};

export default Home;
