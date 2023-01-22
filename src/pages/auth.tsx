import { NextPage } from "next";
import React from "react";

import { AuthBody } from "@/pages-component/auth/AuthBody";
import Layout from "@/pages-layout/layout";

const Auth: NextPage = () => {
  return (
    <Layout>
      <AuthBody />
    </Layout>
  );
};

export default Auth;
