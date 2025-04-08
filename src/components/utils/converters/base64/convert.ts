import { Data, Effect } from 'effect';

class Base64Error extends Data.Error<{
  type: 'encode' | 'decode';
}> {}

const encode = (input: string) => {
  return Effect.try({
    try: () => btoa(input),
    catch: () => new Base64Error({ type: 'encode' }),
  });
};

const decode = (input: string) => {
  return Effect.try({
    try: () => atob(input),
    catch: () => new Base64Error({ type: 'decode' }),
  });
};

export const execute = (input: string, repeat: number, isEncoding: boolean) => {
  return Effect.gen(function* (_) {
    let out = input;

    const op = isEncoding ? encode : decode;

    for (let i = 0; i < repeat; i++) {
      out = yield* _(op(out));
    }

    return {
      value: out,
      error: false,
    };
  });
};
