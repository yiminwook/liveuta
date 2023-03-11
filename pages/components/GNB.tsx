import Link from "next/link";
import gnb from "@/styles/GNB.module.scss";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const GNB = function () {
  return (
    <nav>
      <div className={gnb.logo}></div>
      <div className={gnb.title}>Live Uta</div>
      <div className={gnb.link_form}>
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
