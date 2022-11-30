import { styled } from "@mui/material";

const isPortrait = window.matchMedia("(orientation: portrait)").matches;
const Section = styled("section")({
  height: "100%",
  background: "#DADADA",
  overflow: "hidden",
  position: "relative",
});

const Layout = styled("div")({
  width: "100%",
  color: "#5D4037",
  textAlign: "center",
  marginTop: "3.5%",
  animation: "fadein 2.5s",
});

const TitleLayout = styled("p")({
  width: "100%",
  fontSize: isPortrait ? "2.5em" : "3.5em",
  margin: 0,
  fontWeight: "500",
});

const SubtitleLayout = styled("p")({
  width: "100%",
  fontSize: isPortrait ? "1.2em" : "2em",
  margin: "24px 0",
  fontWeight: "300",
});

const ImageLayout = styled("div")({
  width: "100%",
  background: "#DADADA",
  bottom: "-5px",
  textAlign: "center",
  position: "absolute",
});

const Image = styled("div")({
  width: isPortrait ? "100%" : "40%",
});

const Title = () => {
  return (
    <Section>
      <Layout>
        <SubtitleLayout>Invitation</SubtitleLayout>
        <TitleLayout>Việt Anh &amp; Phương Anh</TitleLayout>
        <SubtitleLayout>
          08/01/2022
          <br />
          Nikko Hotel Saigon
        </SubtitleLayout>
      </Layout>
    </Section>
  );
};

export default Title;
