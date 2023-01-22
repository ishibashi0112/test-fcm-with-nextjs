importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

const getUrlQueryParams = (key) => {
  return new URL(location).searchParams.get(key);
};

firebase.initializeApp({
  apiKey: getUrlQueryParams("apiKey"),
  authDomain: getUrlQueryParams("authDomain"),
  projectId: getUrlQueryParams("projectId"),
  databaseURL: getUrlQueryParams("databaseURL"),
  storageBucket: getUrlQueryParams("storageBucket"),
  messagingSenderId: getUrlQueryParams("messagingSenderId"),
  appId: getUrlQueryParams("appId"),
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
