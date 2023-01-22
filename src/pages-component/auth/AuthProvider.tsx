import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect } from "react";
import { useSnapshot } from "valtio";

import { auth } from "@/lib/firebase/firebase";
import { requestMessagingPermission } from "@/lib/firebase/messaging";
import { setCurrentUser, state } from "@/lib/store/valtio";

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const { currentUser, isRequestedMessagingPermission } = useSnapshot(state);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!isRequestedMessagingPermission) {
          await requestMessagingPermission(user.uid);
        }
        if (!currentUser) {
          await setCurrentUser(user.uid);
          router.push("/");
        }
      } else {
        if (router.pathname !== "/auth") {
          router.replace("/auth?type=signin");
        }
      }
    });
    return () => unsubscribe();
  });

  return <>{children}</>;
};
