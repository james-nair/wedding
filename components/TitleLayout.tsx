import { styled } from "@mui/material";
import { useConfig } from "../lib/useConfig";
import { useIsPortrait } from "../lib/useIsPortrait";
import { useMediaQuery } from "../lib/useMediaQuery";
import { BACKGROUND_COLOR } from "../styles/constant";
import { Love_Light } from "@next/font/google";

const font = Love_Light({
  weight: "400",
  subsets: ["latin", "vietnamese"],
});
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
  color: "#fffdf8",
  textAlign: "center",
  marginTop: "3.5%",
  animation: "fadein 2.5s",
});

const TitleLayout = styled("p", {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>(({ isPortrait, isSmall }) => ({
  width: "100%",
  fontSize: isSmall ? "4em" : "5.5em",
  margin: 0,
}));

const SubtitleLayout = styled("p", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>(({ isPortrait }) => ({
  width: "100%",
  fontSize: isPortrait ? "2em" : "3.5em",
  margin: "24px 0",
  fontWeight: "300",
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
        backgroundPosition: "center center",

        // backgroundRepeat: "no-repeat",
      }}
    >
      <Layout isPortrait={isPortrait}>
        <SubtitleLayout isPortrait={isPortrait}>Invitation</SubtitleLayout>
        <TitleLayout isSmall={isSmall} className={font.className}>
          {isSmall ? (
            <>
              {config.groom.name} <br /> &amp; <br />
              {config.bride.name}
            </>
          ) : (
            <>
              {config.groom.name} &amp; {config.bride.name}
            </>
          )}
        </TitleLayout>
        <SubtitleLayout isPortrait={isPortrait}>
          <>{config.weddingDate.toLocaleDateString()}</>
        </SubtitleLayout>
      </Layout>
      {/* <ImageLayout>
        <Image src={config.titleImage.src} />
      </ImageLayout> */}
    </Section>
  );
};

export default Title;
