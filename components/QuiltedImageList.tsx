import { ImageList, ImageListItem, SxProps, Theme } from "@mui/material";
import Image from "next/image";

export type ImageDisplay = {
  src: string;
  cols: number;
  rows: number;
  objectPosition?: string;
};

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

type Props = {
  cols: number;
  data: ImageDisplay[];
  //   rowHeight: number;
  sx?: SxProps<Theme>;
};
export const QuiltedImageList = (props: Props) => {
  return (
    <ImageList
      cols={6}
      variant="quilted"
      //   rowHeight={props.rowHeight}
      sx={props.sx}
    >
      {props.data.map((item) => (
        <ImageListItem key={item.src} cols={item.cols} rows={item.rows}>
          {/* <img {...srcset(item.src, props.rowHeight, item.rows, item.cols)} /> */}
          {/* <Image
            alt={`quilted-image-${item.src}`}
            {...srcset(item.src, props.rowHeight, item.rows, item.cols)}
          /> */}
          <img
            src={item.src}
            style={{ objectFit: "cover", objectPosition: item.objectPosition }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
