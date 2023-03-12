import gnb from "@/styles/GNB.module.scss";
import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";

const { publicRuntimeConfig } = getConfig();

const GNB = function () {
  return (
    <nav>
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
      <div className={gnb.title}>Live Uta</div>
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
