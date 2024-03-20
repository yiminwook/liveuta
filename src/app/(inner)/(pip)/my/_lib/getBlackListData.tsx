'use server';
import errorHandler from '@/model/error/handler';
import { getAllChannel } from '@/model/mongoDB/getAllChannel';
import { getAllBlackList } from '@/model/oracleDB/blacklist/service';
import { ChannelData } from '@/type/api/mongoDB';
import parseAccessToken from '@inner/_lib/parseAccessToken';
import { Session } from 'next-auth';

export default async function getBlackListData(session: Session) {
  try {
    const payload = await parseAccessToken(session.user.accessToken);
    const channelList = await getAllChannel();
    const channelData = Object.fromEntries(
      channelList.channels.map((channel) => {
        const { _id, ...rest } = channel;
        return [channel.channel_id, rest];
      }),
    );
    const blacklist = await getAllBlackList({ memberId: payload.id });
    const blacklistData = blacklist
      .map<ChannelData>((item) => channelData[item])
      .filter((item) => !!item);
    return { stat: 200, message: '블랙리스트를 조회했습니다.', result: blacklistData };
  } catch (error) {
    console.error('getBlackListData severAction', error);
    const { status, message } = errorHandler(error);
    return { status, message, result: null };
  }
}
