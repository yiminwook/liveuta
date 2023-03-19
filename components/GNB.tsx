import gnb from "@/styles/GNB.module.scss";
import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

const { publicRuntimeConfig } = getConfig();

const { protocol, host, port } = publicRuntimeConfig;
const baseurl = `${protocol}://${host}:${port}/`;

const GNB: React.FC = function () {
  const gnbRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    const current = gnbRef.current;
    if (current) {
      console.log("test");
      const timeOut = setTimeout(() => {
        current.style.top = "0";
      }, 3000);
      if (window.scrollY > 0) {
        current.style.top = "-3.5rem";
      } else {
        clearTimeout(timeOut);
        current.style.top = "";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={gnb.nav} ref={gnbRef}>
      <div className={gnb.internet_link}>
        <Link href="https://gall.dcinside.com/mini/board/lists?id=vuta">
          <Image
            src="/nav_internet.png"
            width={40}
            height={40}
            alt="internet_icon"
          ></Image>
        </Link>
      </div>
      <div className={gnb.title}>
        <a href={baseurl}>Live Uta</a>
      </div>
      <div className={gnb.form_link}>
        <Link
          href={`https://docs.google.com/spreadsheets/d/${
            publicRuntimeConfig.spreadsheetId ?? ""
          }/`}
        >
          Form
        </Link>
      </div>
    </nav>
  );
};

export default GNB;
