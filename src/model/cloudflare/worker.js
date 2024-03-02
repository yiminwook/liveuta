// An example worker which supports CORS. It passes GET and HEAD
// requests through to the origin, but answers OPTIONS and POST
// requests directly. POST requests must contain a JSON payload,
// which is simply echoed back.

addEventListener('fetch', (event) => {
  event.respondWith(
    handle(event.request)
      // For ease of debugging, we return exception stack
      // traces in response bodies. You are advised to
      // remove this .catch() in production.
      .catch(
        (e) =>
          new Response(e.stack, {
            status: 500,
            statusText: 'Internal Server Error',
          }),
      ),
  );
});

async function handle(request) {
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  } else if (request.method === 'GET') {
    // Pass-through to origin.
    return handleGet(request);
  } else {
    return new Response(null, {
      status: 405,
      statusText: 'Method Not Allowed',
    });
  }
}

// We support the GET, POST, HEAD, and OPTIONS methods from any origin,
// and accept the Content-Type header on requests. These headers must be
// present on all responses to all CORS requests. In practice, this means
// all responses to OPTIONS or POST requests.
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://liveuta.vercel.app',
  'Access-Control-Allow-Methods': 'OPTIONS, GET',
  // 'Access-Control-Allow-Headers': '*',
};

function handleOptions(request) {
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
  if (reqhead.has('x-real-ip')) reqhead.delete('x-real-ip');

  for (let [key, val] of reqhead) {
    if (key.startsWith('cf-') || key.startsWith('x-forwarded-')) {
      reqhead.delete(key);
    }
  }

  reqhead.set('Host', 'localhost:3000');

  let res = await fetch(videoUrl, {
    method: 'GET',
    headers: reqhead,
  });

  const text = await res.text();
  const pattern = /\{"text"\:"현재 "\},\{"text"\:"(\d+(?:,\d{3})*)"\},\{"text"\:"명 시청 중"\}/;
  const matched = text.match(pattern)?.[1];

  const count = typeof matched !== 'string' ? '?' : matched;

  const data = {
    count,
  };

  const response = new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });

  // Add CORS headers to the response
  // response.headers.set('Access-Control-Allow-Origin', 'https://liveuta.vercel.app');
  // response.headers.set('Access-Control-Allow-Methods', 'OPTINONS, GET');
  // response.headers.set('Access-Control-Allow-Headers', '*');

  return response;
}
