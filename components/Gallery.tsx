import { ImageList, ImageListItem, styled } from "@mui/material";
import { useRef } from "react";
import { useConfig } from "../lib/useConfig";
import { useIsPortrait } from "../lib/useIsPortrait";
import useOnScreen from "../lib/useOnScreen";
import {
  BACKGROUND_COLOR,
  BACKGROUND_TRANSITION,
  Header,
} from "../styles/constant";

interface ComponentProps {
  isPortrait?: boolean;
}

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
        background: BACKGROUND_COLOR,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Header title="YoooHoooo" />
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
