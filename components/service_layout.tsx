/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";
import GNB from "./GNB";
import home from "@/styles/Home.module.scss";
import Image from "next/image";
import Loading from "./loading";
import useUpcomming from "@/hooks/useUpcomming";
import { ReactNode } from "react";
import getConfig from "next/config";

interface ServiceLayoutProps {
  title?: string;
  discription?: string;
  children: ReactNode;
}

const { publicRuntimeConfig } = getConfig();

const ServiceLayout = function ({
  title = "LiveUta",
  discription = "Show V-Tuber Utawaku schedule",
  children,
}: ServiceLayoutProps) {
  const { isLoading } = useUpcomming();
  const metaImg = publicRuntimeConfig.meta_img;

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <meta property="og:image" content={metaImg} />
        <meta name="twitter:image" content={metaImg} />
        <link
          rel="icon"
          href="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png"
        />
      </Head>
      <GNB />
      {isLoading ? <Loading /> : null}
      <div className={home.app}>{children}</div>
      <button
        className="foat_button"
        onClick={scrollUp}
        onTouchEnd={scrollUp}
        onTouchStart={scrollUp}
      >
        <Image
          src="/float.png"
          width={50}
          height={50}
          alt="float"
          unoptimized
        />
      </button>
    </>
  );
};

export default ServiceLayout;
