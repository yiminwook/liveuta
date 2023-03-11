import home from "@/styles/Home.module.scss";
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import getBaseUrl from "@/utils/get_base_url";
import { ServiceLayout } from "./components/service_layout";

interface Data {
  title: string;
  url: string;
  channelName: string;
  scheduledTime: string;
}

interface Props {
  arr: Data[];
}

const Home: NextPage<Props> = ({ arr }) => {
  return (
    <>
      <ServiceLayout title="LiveUta Home">
        <main className={home.main}>
          {arr.map((data) => {
            return (
              <div key={data.url}>
                <div>{data.title}</div>
                <div>{data.url}</div>
                <div>{data.channelName}</div>
                <div>{data.scheduledTime}</div>
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
    const result = await axios.get<Props>(`${baseUrl}/api/sheet`);
    const arr = result.data;
    return {
      props: {
        arr,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        arr: [],
      },
    };
  }
};

export default Home;
