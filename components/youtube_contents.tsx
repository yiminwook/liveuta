import React from "react";
import { UpcomingData } from "@/models/sheet/in_sheet";
import youtube_contents from "@/styles/youtube_contents.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  contents: UpcomingData;
}

const Youtube_contents: React.FC<Props> = ({ contents }) => {
  const { title, url, channelName, videoId, thumbnailUrl, korTime, iterval } =
    contents;
  const [imgLoaded, setImgLoaded] = React.useState(true);

  return (
    <div className={youtube_contents.youtube__container} key={videoId}>
      <div className={youtube_contents.youtube_content__container}>
        <div className={youtube_contents.youtube_thumnail__container}>
          <Link href={url ?? ""}>
            <Image
              src={thumbnailUrl}
              width={480}
              height={360}
              alt="thumbnail"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/thumbnail_alt_img.jpg"
              onError={() => {
                setImgLoaded(false)
              }}
              className={imgLoaded ? "" : youtube_contents.hidden}
            ></Image>
            {!imgLoaded &&
              <Image
                src="/thumbnail_alt_img.jpg"
                alt="thumbnail error"
                width={480}
                height={360} />
            }
          </Link>
        </div>
        <div className={youtube_contents.youtube_description}>
          <div className={youtube_contents.youtube_channel_name}>
            {channelName ?? "no channel name"}
          </div>
          <div className={youtube_contents.youtube_title}>
            {title ?? "no title"}
          </div>
          <Link className={youtube_contents.youtube_link} href={url ?? ""}>
            {url ?? "no url"}
          </Link>
          <div className={youtube_contents.youtube_time__container}>
            <div className={youtube_contents.youtube_time__kor}>
              {korTime ?? "no sheduled time"}
            </div>
            <div className={youtube_contents.youtube_time__inter}>
              {iterval ? `(${iterval})` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Youtube_contents;
