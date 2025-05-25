import { searchChannelAutocomplete } from '@/libraries/mongodb/channels';
import { Effect } from 'effect';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, props: { params: Promise<{ query: string }> }) {
  const program = Effect.gen(function* () {
    const { query } = yield* Effect.promise(() => props.params);

    const res = yield* searchChannelAutocomplete(query);

    return NextResponse.json({ message: '.', data: res }, { status: 201 });
  }).pipe(
    Effect.catchAll((error) => {
      console.error(error);

      return Effect.succeed(
        NextResponse.json({ message: error._tag, data: null }, { status: 201 }),
      );
    }),
  );

  const res = await Effect.runPromise(program);

  return res;
}
