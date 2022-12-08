import { styled } from "@mui/material";
import { useConfig } from "../lib/useConfig";
import { BACKGROUND_COLOR } from "../styles/constant";
import { Info } from "./Info";

interface ComponentProps {
  isPortrait?: boolean;
  isSmall?: boolean;
}
const Section = styled("section", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>({
  height: "fit-content",
  overflow: "hidden",
  position: "relative",
  backgroundColor: BACKGROUND_COLOR,
  textAlign: "center",
  padding: "3rem 0 3rem 0",
});

const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "isSmall" && prop !== "isPortrait",
})<ComponentProps>(({ isSmall }) => ({
  maxWidth: isSmall ? "95%" : "80%",
  margin: "0 auto",
}));
export const AboutUs = () => {
  const config = useConfig();

  return (
    <Section>
      <Container>
        <Info
          person={config.groom}
          title="The Groom"
          left
          quote={config.groom.quote}
        />
        <Info
          person={config.bride}
          title="The Bride"
          right
          quote={config.bride.quote}
        />
      </Container>
    </Section>
  );
};
