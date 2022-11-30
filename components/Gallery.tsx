import { ImageList, ImageListItem, styled } from "@mui/material";
import { useRef } from "react";
import { useConfig } from "../lib/useConfig";
import { useIsPortrait } from "../lib/useIsPortrait";
import useOnScreen from "../lib/useOnScreen";

interface ComponentProps {
  isPortrait?: boolean;
}
const Layout = styled("div", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>(({ isPortrait }) => ({
  width: "100%",
  padding: isPortrait ? "30% 0% 15% 5%" : "5% 0% 5% 10%",
  animation: "fadein 2.5s",
}));

const Title = styled("p", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>(({ isPortrait }) => ({
  color: "#FFFFFF",
  width: "100%",
  fontSize: isPortrait ? "2.5em" : "3.5em",
  margin: 0,
  fontWeight: "500",
}));

export const Gallery = () => {
  const config = useConfig();
  const isPortrait = useIsPortrait();
  const ref = useRef<HTMLSelectElement>(null);
  const onScreen = useOnScreen<HTMLDivElement>(ref, "-125px");

  return (
    <section
      ref={ref}
      style={{
        height: "fit-content",
        background: onScreen ? "#EFEBE9" : "#DADADA",
        overflow: "hidden",
        position: "relative",
        transition: "background 1s ease-in",
      }}
    >
      <Layout>
        <Title>YooooHooo</Title>
      </Layout>
      <ImageList variant="woven" cols={4} gap={2}>
        {config.galleryImages.map((image) => (
          <ImageListItem key={`image_${image.src}`}>
            <img
              src={`${image.src}?w=100&fit=crop&auto=format`}
              srcSet={`${image.src}?w=100&fit=crop&auto=format&dpr=2 2x`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </section>
  );
};
