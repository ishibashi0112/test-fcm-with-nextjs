import "@/styles/globals.css";

import type { AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/pages-component/auth/AuthProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Toaster />
    </>
  );
};

export default App;
