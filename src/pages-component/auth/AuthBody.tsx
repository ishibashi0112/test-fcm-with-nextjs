import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const AuthBody: FC = () => {
  const [display, setDisplay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setDisplay(true);
    }
  }, [router.isReady]);

  if (!display) return <div>loading...</div>;

  if (router.query.type === "signin") return <SignIn />;
  if (router.query.type === "signup") return <SignUp />;
  return <></>;
};
