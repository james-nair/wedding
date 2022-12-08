import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ConfigWrapper } from "../lib/useConfig";
import { UserAuth } from "../lib/UserAuth";
import { HEADER_COLOR } from "../styles/constant";
import "../styles/globals.css";
const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Playfair Display, serif",
      allVariants: {
        color: HEADER_COLOR,
      },
    },
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <UserAuth>
        {/* <Navbar /> */}
        <ConfigWrapper>
          <Component {...pageProps} />
        </ConfigWrapper>

        <Toaster />
      </UserAuth>
    </ThemeProvider>
  );
}
