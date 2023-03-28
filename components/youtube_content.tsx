import { useState } from "react";
import { UpcomingData } from "@/models/sheet/in_sheet";
import youtube_content from "@/styles/youtube_content.module.scss";
import Link from "next/link";
import Image from "next/image";

interface Props {
  contents: UpcomingData;
}

const Youtube_content: React.FC<Props> = ({ contents }) => {
  const { title, url, channelName, videoId, korTime, iterval } = contents;
  const [imgLoaded, setImgLoaded] = useState(true);
  let thumbnailUrl = contents.thumbnailUrl;
  let thumbnailAlt = "thumbnail";

  if (
    thumbnailUrl === "failed to get" ||
    thumbnailUrl === undefined ||
    thumbnailUrl === null
  ) {
    thumbnailUrl = "/thumbnail_alt_img.jpg";
    thumbnailAlt = "thumbnail error";
  }

  return (
    <div className={youtube_content.youtube__container} key={videoId}>
      <div className={youtube_content.youtube_content__container}>
        <div className={youtube_content.youtube_thumnail__container}>
          <Link className={youtube_content.img_link} href={url ?? ""}>
            <Image
              src={thumbnailUrl}
              width={480}
              height={360}
              alt={thumbnailAlt}
              loading="lazy"
              onError={() => {
                setImgLoaded(false);
              }}
              className={imgLoaded ? "" : youtube_content.hidden}
              unoptimized
            />
            {!imgLoaded && (
              <Image
                src="/thumbnail_alt_img.jpg"
                alt={thumbnailAlt}
                width={480}
                height={360}
                unoptimized
              />
            )}
          </Link>
        </div>
        <div className={youtube_content.youtube_description}>
          <div className={youtube_content.youtube_channel_name}>
            {channelName ?? "no channel name"}
          </div>
          <div className={youtube_content.youtube_title}>
            {title ?? "no title"}
          </div>
          <Link className={youtube_content.youtube_link} href={url ?? ""}>
            {url ?? "no url"}
          </Link>
          <div className={youtube_content.youtube_time__container}>
            <div className={youtube_content.youtube_time__kor}>
              {korTime ?? "no sheduled time"}
            </div>
            <div className={youtube_content.youtube_time__inter}>
              {iterval ? `(${iterval})` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Youtube_content;
