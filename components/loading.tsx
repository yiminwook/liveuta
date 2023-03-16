import Image from "next/image";
import loading from "@/styles/loading.module.scss";

const Loading = function () {
  return (
    <div className={loading.loading}>
      <div className={loading.loading__container}>
        <div className={loading.loading_center} style={{ border: "none" }}>
          <Image
            src="/utawaku.png"
            width={100}
            height={100}
            alt="loading_img"
            priority
          ></Image>
          <div>Loading Now</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
