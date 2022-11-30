import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserAuth } from "../lib/UserAuth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserAuth>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserAuth>
  );
}
