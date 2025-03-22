async function init() {
  if (process.env.NEXT_PUBLIC_MSW_ENABLED === 'true') {
    await import('./server').then(({ mockServer }) => {
      mockServer.listen();
      console.log('[SERVER]: MSW enabled');
    });
  }
}

init();
