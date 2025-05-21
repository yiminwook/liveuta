import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { LogicError, requestChannel } from '@/libraries/mongodb/request-channel';
import { deleteSetlist, postSetlist, updateSetlist } from '@/libraries/oracledb/setlist/service';
import { getYoutubeChannelsByVideoId } from '@/libraries/youtube';
import { SETLIST_DELETE_LEVEL } from '@/types/api/setlist';
import parseAccessToken from '@/utils/parse-access-token';
import { Effect } from 'effect';
import { NextRequest, NextResponse } from 'next/server';

type RequestSuccess = {
  ok: true;
  data: {
    channelId: string;
    handle: string;
  };
};

type RequestFail = {
  ok: false;
  error: string;
  cause?: string;
};

type RequestReturnType = RequestSuccess | RequestFail;

export async function POST(req: NextRequest) {
  const program: Effect.Effect<RequestReturnType> = Effect.gen(function* () {
    const body = yield* Effect.tryPromise(() => req.json());

    const channelName = body.channelName as string | undefined;
    const url = body.url as string | undefined;

    if (!channelName || !url) {
      yield* Effect.fail(
        new LogicError({
          message: 'Invalid Data',
        }),
      );
    }

    const res = yield* requestChannel(channelName!, url!);

    const value: RequestSuccess = {
      ok: true,
      data: res,
    };

    return value;
  }).pipe(
    Effect.catchTags({
      LogicError: (e) =>
        Effect.succeed<RequestFail>({ ok: false, error: 'Logic Error', cause: e.message }),
      MongoDBError: (e) =>
        Effect.succeed<RequestFail>({ ok: false, error: 'MongoDB Error', cause: e.message }),
      YoutubeError: (e) =>
        Effect.succeed<RequestFail>({ ok: false, error: 'Youtube Error', cause: e.message }),
      UnknownException: (e) =>
        Effect.succeed<RequestFail>({ ok: false, error: 'Unknown Error', cause: e.message }),
    }),
  );

  const res = await Effect.runPromise(program);

  if (res.ok) {
    return NextResponse.json(res, { status: 201 });
  } else {
    return NextResponse.json(res, { status: 400 });
  }
}
