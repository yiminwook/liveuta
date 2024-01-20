const VERSION = 'v1';
const FIREBASE_VERSION = '9.22.0';

importScripts(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app-compat.js`);
importScripts(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-messaging-compat.js`);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

firebase.initializeApp({
  apiKey: 'AIzaSyBj_S-SLCrL1czKbDO3VADMl338FD7J6yk',
  authDomain: 'liveuta-bfd1a.firebaseapp.com',
  projectId: 'liveuta-bfd1a',
  storageBucket: 'liveuta-bfd1a.appspot.com',
  messagingSenderId: '345139032927',
  appId: '1:345139032927:web:30b2b23060c0f1274e3cea',
  measurementId: 'G-4STJ8NQ029',
});

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.

// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options

messaging.onBackgroundMessage(function ({ data }) {
  if (data === undefined) return;
  self.registration.showNotification(data.title, {
    body: data.body,
    image: data.imageUrl,
    timestamp: Number(data.timestamp),
    data: data.link,
  });
});

self.addEventListener('notificationclick', function (event) {
  const url = event.notification.data;
  event.notification.close(); // Android needs explicit close

  if (url === undefined || url === null) return;
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      for (var i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    }),
  );
});
