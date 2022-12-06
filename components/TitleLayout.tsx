import { styled, Typography } from "@mui/material";
import { useConfig } from "../lib/useConfig";
import { useIsPortrait } from "../lib/useIsPortrait";
import { useMediaQuery } from "../lib/useMediaQuery";
import { BACKGROUND_COLOR } from "../styles/constant";
import { Love_Light, Xanh_Mono } from "@next/font/google";

const font = Love_Light({
  weight: "400",
  subsets: ["latin", "vietnamese"],
});

const subFont = Xanh_Mono({ weight: "400", subsets: ["latin"] });
interface ComponentProps {
  isPortrait?: boolean;
  isSmall?: boolean;
}
// const isPortrait = window.matchMedia("(orientation: portrait)").matches;
const Section = styled("section", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>({
  height: "100%",
  // background: "#DADADA",
  overflow: "hidden",
  position: "relative",
});

const Layout = styled("div")<ComponentProps>({
  width: "100%",
  color: BACKGROUND_COLOR,
  textAlign: "center",
  marginTop: "3.5%",
  animation: "fadein 2.5s",
});

const TitleLayout = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>(({ isPortrait, isSmall }) => ({
  width: isSmall ? "100%" : "50%",
  // fontSize: isSmall ? "4em" : "5.5em",
  margin: 0,
}));

const SubtitleLayout = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>(({ isPortrait, isSmall }) => ({
  width: isSmall ? "100%" : "50%",
  // fontSize: isPortrait ? "2em" : "3.5em",
  margin: "24px 0",
  color: BACKGROUND_COLOR,
}));

const ImageLayout = styled("div")<ComponentProps>({
  width: "100%",
  background: "#DADADA",
  bottom: "-5px",
  textAlign: "center",
  position: "absolute",
});

const Image = styled("img", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>(({ isPortrait }) => ({
  width: isPortrait ? "100%" : "40%",
}));

const Title = () => {
  const isPortrait = useIsPortrait();
  const isSmall = useMediaQuery("md");
  const config = useConfig();
  return (
    <Section
      sx={{
        backgroundImage: `url(${config.titleImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "73% ",

        // backgroundRepeat: "no-repeat",
      }}
    >
      <Layout isPortrait={isPortrait}>
        <SubtitleLayout
          isSmall={isSmall}
          variant={isSmall ? "h3" : "h2"}
          className={subFont.className}
        >
          Save The Date
        </SubtitleLayout>
        <TitleLayout
          isSmall={isSmall}
          variant={isSmall ? "h2" : "h1"}
          className={font.className}
        >
          {config.groom.name}
          <br />
          &amp;
          <br />
          {config.bride.name}
        </TitleLayout>
        <SubtitleLayout
          variant={isSmall ? "h3" : "h2"}
          isSmall={isSmall}
          className={subFont.className}
        >
          <>
            {config.weddingDate.toLocaleDateString("de", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </>
        </SubtitleLayout>
      </Layout>
      {/* <ImageLayout>
        <Image src={config.titleImage.src} />
      </ImageLayout> */}
    </Section>
  );
};

export default Title;
