/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";
import GNB from "./GNB";
import home from "@/styles/Home.module.scss";
import Image from "next/image";
import getConfig from "next/config";
import getBaseUrl from "@/utils/get_base_url";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const ServiceLayout: React.FC<Props> = function ({
  title = "LiveUta",
  children,
}: Props) {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = getBaseUrl(false);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="show real time vtuber schedule" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content="live uta" />
        <meta property="og:image" content={publicRuntimeConfig.meta_img} />
        <meta name="twitter:image" content={publicRuntimeConfig.meta_img} />
        <meta name="twitter:site" content="live uta" />
        <meta name="twitter:title" content="live uta" />
        <meta name="twitter:card" content="summary" />
        <link
          rel="icon"
          href="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png"
        />
      </Head>
      <div className={home.app}>
        <GNB />
        {children}
        <button
          className="foat_button"
          onClick={scrollUp}
          onTouchEnd={scrollUp}
          onTouchStart={scrollUp}
        >
          <Image src="/float.png" width={50} height={50} alt="float"></Image>
        </button>
      </div>
    </>
  );
};

export default ServiceLayout;
