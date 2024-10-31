// @ts-ignore
import { SearchCommentItemType } from '@/type/api/holodex';
import Image from 'next/image';
import { DEFAULT_BLUR_BASE64 } from '@/constants';
import setlist from './setlist.module.scss';
import { stringToTime } from '@/utils/getTime';
import { replaceParentheses } from '@/utils/regexp';
import dayjs from '@/libraries/dayjs';

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
