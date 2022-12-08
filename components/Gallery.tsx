import { ImageList, ImageListItem, styled } from "@mui/material";
import { StaticImageData } from "next/image";
import { useRef } from "react";
import { MyConfig, useConfig } from "../lib/useConfig";
import { useIsPortrait } from "../lib/useIsPortrait";
import { useMediaQuery } from "../lib/useMediaQuery";
import useOnScreen from "../lib/useOnScreen";
import {
  BACKGROUND_COLOR,
  BACKGROUND_TRANSITION,
  Header,
} from "../styles/constant";
import { ImageDisplay, QuiltedImageList } from "./QuiltedImageList";
import Image1 from "../assets/PAVAnh_Prewedding_C1_4V0A9336-L.jpg";
import Image2 from "../assets/PAVAnh_Prewedding_C1_4V0A9387-L.jpg";
import Image3 from "../assets/PAVAnh_Prewedding_C1_4V0A9292-L.jpg";
import Image4 from "../assets/PAVAnh_Prewedding_C1_4V0A9278-L.jpg";
import Image5 from "../assets/PAVAnh_Prewedding_C1_4V0A9332-L.jpg";
import Image6 from "../assets/PAVAnh_Prewedding_C1_4V0A9472.jpg";
interface ComponentProps {
  isPortrait?: boolean;
}

export const Gallery = () => {
  const config = useConfig();
  const isPortrait = useIsPortrait();
  const isSmall = useMediaQuery("md");
  const ref = useRef<HTMLSelectElement>(null);
  const onScreen = useOnScreen<HTMLDivElement>(ref, "-125px");

  return (
    <section
      ref={ref}
      style={{
        background: BACKGROUND_COLOR,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Header title="YoooHoooo" />
      {/* <ImageList variant="woven" cols={4} gap={2}>
        {config.galleryImages.map((image) => (
          <ImageListItem key={`image_${image.src}`}>
            <img
              src={`${image.src}?w=100&fit=crop&auto=format`}
              srcSet={`${image.src}?w=100&fit=crop&auto=format&dpr=2 2x`}
            />
          </ImageListItem>
        ))}
      </ImageList> */}
      <QuiltedImageList
        sx={{ width: "100%", height: "100%" }}
        cols={6}
        data={ItemData()}
        // rowHeight={10}
      />
    </section>
  );
};

const ItemData = (): ImageDisplay[] => {
  const images = MyConfig.galleryImages;

  return [
    {
      src: Image1.src,
      cols: 1,
      rows: 3,
      objectPosition: "50%",
    },
    {
      src: Image2.src,
      cols: 1,
      rows: 3,
      objectPosition: "75%",
    },
    {
      src: Image3.src,
      cols: 2,
      rows: 6,
    },
    {
      src: Image4.src,
      cols: 2,
      rows: 4,
    },
    {
      src: Image5.src,
      cols: 2,
      rows: 3,
    },
    {
      src: Image6.src,
      cols: 2,
      rows: 2,
    },
  ];
};
