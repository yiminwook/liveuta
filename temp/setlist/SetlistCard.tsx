// @ts-ignore
import { SearchCommentItemType } from '@/type/inHolodex';
import Image from 'next/image';
import { DEFAULT_BLUR_BASE64 } from '@/const';
import setlist from '@/components/setlist/Setlist.module.scss';
import { stringToTime } from '@/util/getTime';
import { replaceParentheses } from '@/util/regexp';
import dayjs from '@/model/dayjs';

interface SetlistCardProps {
  item: SearchCommentItemType;
}

const SetlistCard = ({ item }: SetlistCardProps) => {
  const { korTime } = stringToTime(dayjs(item.published_at));

  const title = replaceParentheses(item.title);
  return (
    <div className={setlist['card']}>
      <div>
        <a href={`https://www.youtube.com/watch?v=${item.id}`}>
          <div>
            <Image
              src={item.channel.photo}
              alt=""
              loading="lazy"
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR_BASE64}
              fill
              unoptimized
            />
          </div>
        </a>
        <div>
          <h4>{title}</h4>
          <h5>{item.channel.name}</h5>
          <time>{korTime}</time>
        </div>
      </div>
      {/* <Comment comment={item.comments[0]} /> */}
    </div>
  );
};

export default SetlistCard;
