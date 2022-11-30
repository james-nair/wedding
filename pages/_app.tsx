import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ConfigWrapper } from "../lib/useConfig";
import { UserAuth } from "../lib/UserAuth";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserAuth>
      {/* <Navbar /> */}
      <ConfigWrapper>
        <Component {...pageProps} />
      </ConfigWrapper>

      <Toaster />
    </UserAuth>
  );
}
