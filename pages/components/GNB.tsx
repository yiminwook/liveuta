import Link from "next/link";
import gnb from "@/styles/GNB.module.scss";

const GNB = function () {
  return (
    <nav>
      <div className={gnb.logo}></div>
      <div className={gnb.title}>Live Uta</div>
      <div className={gnb.link_form}>
        <Link href="https://docs.google.com/spreadsheets/d/1wxJgqcjJomR7suwMgndIVkYDjFslzASo9UjdVltcIG4/">
          Form
        </Link>
      </div>
    </nav>
  );
};

export default GNB;
