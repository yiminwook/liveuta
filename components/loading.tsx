import Image from "next/image";

const Loading = function () {
  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading_center" style={{ border: "none" }}>
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
