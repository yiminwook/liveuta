import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import ServiceLayout from "@/components/service_layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <RecoilRoot>
        <div className="background" />
        <div className="backdrop" />
        <ServiceLayout title="LiveUta Home">
          <Component {...pageProps} />
        </ServiceLayout>
      </RecoilRoot>
      <Analytics />
    </>
  );
};

export default App;
