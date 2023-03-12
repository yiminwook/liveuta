/* eslint-disable react/jsx-props-no-spreading */
import Head from "next/head";
import GNB from "./GNB";
import home from "@/styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const ServiceLayout: React.FC<Props> = function ({
  title = "LiveUta",
  children,
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png"
        />
      </Head>
      <div className={home.app}>
        <GNB />
        {children}
        <div
          className="foat_button"
          onClick={() => {
            window.scroll({ top: 0, behavior: "smooth" });
          }}
        >
          <Image src="/float.png" width={50} height={50} alt="float"></Image>
        </div>
      </div>
    </>
  );
};

export default ServiceLayout;
