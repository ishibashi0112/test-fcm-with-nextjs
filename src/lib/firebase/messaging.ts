import { getToken, onMessage } from "firebase/messaging";
import { toast } from "react-hot-toast";

import { updateRequestedMessagingPermissionState } from "../store/valtio";
import { firebaseConfig, messaging } from "./firebase";
import { updateFcmToken } from "./firestore";

export const requestMessagingPermission = async (uid: string) => {
  const registration = await navigator.serviceWorker.register(
    `firebase-messaging-sw.js?apiKey=${firebaseConfig.apiKey}&authDomain=${firebaseConfig.authDomain}&projectId=${firebaseConfig.projectId}&databaseURL=${firebaseConfig.databaseURL}&storageBucket=${firebaseConfig.storageBucket}&messagingSenderId=${firebaseConfig.messagingSenderId}&appId=${firebaseConfig.apiKey}`
  );

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    await saveFcmToken(uid, registration);
    updateRequestedMessagingPermissionState();
  } else {
    console.log("not permission");
  }
};

export const saveFcmToken = async (
  uid: string,
  serviceWorkerRegistration: ServiceWorkerRegistration
) => {
  const msg = await messaging();

  if (!msg) throw new Error("fcm init error ");

  const fcmToken = await getToken(msg, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration,
  });
  console.log(fcmToken);

  await updateFcmToken(uid, fcmToken);

  onMessage(msg, (message) => {
    console.log("message text", message);

    toast.success(
      message.notification?.title ? message.notification.title : "fcm message",
      { position: "top-right" }
    );
  });
};
