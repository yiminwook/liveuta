/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";
import GNB from "./GNB";
import home from "@/styles/Home.module.scss";
import getConfig from "next/config";
import { useRecoilValue } from "recoil";
import { isLoadingAtom } from "@/recoil/atom";
import Loading from "./loading";

const { publicRuntimeConfig } = getConfig();

interface Props {
  title?: string;
  children: React.ReactNode;
}

const ServiceLayout: React.FC<Props> = function ({
  title = "LiveUta",
  children,
}: Props) {
  const discription = "Show V-Tuber Utawaku schedule";
  const meta_img = publicRuntimeConfig.meta_img;
  const isLoading = useRecoilValue(isLoadingAtom);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Live Uta" />
        <meta name="twitter:site" content="Live Uta" />
        <meta name="twitter:title" content="Live Uta" />
        <meta property="og:description" content={discription} />
        <meta name="description" content={discription} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:image" content={meta_img} />
        <meta name="twitter:image" content={meta_img} />
        <link
          rel="icon"
          href="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png"
        />
      </Head>
      <div className={home.app}>
        {isLoading && <Loading />}
        <GNB />
        {children}
      </div>
    </>
  );
};

export default ServiceLayout;
