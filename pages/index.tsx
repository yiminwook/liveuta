import { NextPage } from "next";
import axios, { AxiosResponse } from "axios";
import ServiceLayout from "../components/service_layout";
import { UpcomingData } from "../models/sheet/in_sheet";
import home from "@/styles/Home.module.scss";
import Youtube_content from "@/components/youtube_content";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isLoadingAtom } from "@/recoil/atom";

const Home: NextPage = () => {
  const [total, setTotal] = useState<number>(0);
  const [contents, setContents] = useState<UpcomingData[]>([]);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  const getContents = async () => {
    try {
      setIsLoading((_pre) => true);
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

  useEffect(() => {
    getContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {contents.length > 0 &&
              contents.map((data) => {
                return <Youtube_content key={data.videoId} contents={data} />;
              })}
          </div>
        </main>
      </ServiceLayout>
    </>
  );
};

export default Home;
