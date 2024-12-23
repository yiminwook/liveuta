const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://liveuta.vercel.app',
  'Access-Control-Allow-Methods': 'OPTIONS, GET',
  // 'Access-Control-Allow-Headers': '*',
};

async function handler(request) {
  try {
    if (request.method === 'OPTIONS') {
      return handleOptions();
    } else if (request.method === 'GET') {
      // Pass-through to origin.
      return handleGet(request);
    } else {
      return new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      });
    }
  } catch (error) {
    console.log('err', error);
    return new Response(error.stack, { status: 500, statusText: 'Internal Server Error' });
  }
}

async function handleOptions() {
  return new Response(null, {
    headers: corsHeaders,
  });
}

async function handleGet(request) {
  const url = new URL(request.url);
  const vid = url.searchParams.get('v');

  if (!vid) {
    return new Response('Bad request', { status: 400 });
  }

  const videoUrl = `https://youtube.com/watch?v=${vid}`;

  let reqhead = new Headers(request.headers);

  // discard real ip
  for (let [key] of reqhead) {
    if (key.startsWith('cf-') || key.startsWith('x-forwarded-')) {
      reqhead.delete(key);
    }
  }

  reqhead.delete('x-real-ip');
  reqhead.delete('User-Agent');
  reqhead.delete('Host');
  reqhead.delete('Origin');
  reqhead.delete('Referer');

  // const debug = debugHeaders(reqhead);

  const res = await fetch(videoUrl, {
    method: 'GET',
    headers: reqhead,
  });

  const text = await res.text();
  const pattern = /\{"text"\:"현재 "\},\{"text"\:"(\d+(?:,\d{3})*)"\},\{"text"\:"명 시청 중"\}/;
  const matched = text.match(pattern)?.[1];

  const count = typeof matched !== 'string' ? '?' : matched;

  const data = {
    count,
    // debug, //디버깅시 주석해제
  };

  const response = new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });

  return response;
}

const worker = {
  fetch: handler,
};

export default worker;
