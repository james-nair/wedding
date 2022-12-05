import { styled } from "@mui/material";

import { Alex_Brush, Elsie } from "@next/font/google";

export const CursiveFont = Alex_Brush({
  subsets: ["vietnamese", "latin"],
  weight: "400",
});

export const TextFont = Elsie({ subsets: ["latin"], weight: ["400", "900"] });
//original is #EFEBE9
export const BACKGROUND_COLOR = "#fcfaf5";
export const FADE_FROM = "#DADADA";
export const HEADER_COLOR = "#3E3E3E";
export const BACKGROUND_TRANSITION = "background 1s ease-in";

interface ComponentProps {
  isPortrait?: boolean;
  isSmall?: boolean;
}
export const Layout = styled("div", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>(({ isPortrait }) => ({
  width: "100%",
  padding: isPortrait ? "30% 0% 15% 5%" : "5% 0% 5% 10%",
}));

export const Title = styled("p", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>(({ isPortrait }) => ({
  color: HEADER_COLOR,
  width: "100%",
  fontSize: isPortrait ? "2.5em" : "3.5em",
  margin: 0,
}));

export const Header = ({ title }: { title: string }) => {
  return (
    <Layout className={CursiveFont.className}>
      <Title>{title}</Title>
    </Layout>
  );
};

export const TitleLayout = styled("span", {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>(({ isPortrait, isSmall }) => ({
  padding: `0 1rem`,
  margin: "auto",
  maxWidth: isSmall ? "95%" : "80%",
  display: "inline-block",
  fontSize: "4rem",
}));
