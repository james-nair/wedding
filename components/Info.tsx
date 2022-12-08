import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Person, Quote } from "../lib/useConfig";
import { useMediaQuery } from "../lib/useMediaQuery";
import { CursiveFont } from "../styles/constant";

type ImageLocation =
  | { left: true; right?: never }
  | { left?: never; right: true };
type Props = {
  title: string;
  person: Person;
  quote?: Quote;
} & ImageLocation;
export const Info = (props: Props) => {
  const isSmall = useMediaQuery("md");
  //   if (props.left) {
  //     return (
  //       <Grid container spacing={3}>
  //         <Grid item xs={12} md={4}>
  //           <img
  //             src={props.person.image?.src}
  //             style={{
  //               width: "100%",

  //               objectFit: "contain",
  //               borderRadius: "50%",
  //             }}
  //           />
  //         </Grid>
  //         <Grid item xs={12} md={8}>
  //           <h4>Hello</h4>
  //           <p>{props.person.name}</p>
  //         </Grid>
  //       </Grid>
  //     );
  //   } else
  return (
    <Grid
      container
      spacing={3}
      sx={{
        ...(props.right && { flexDirection: "row-reverse" }),
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={4}>
        <img
          src={props.person.image?.src}
          alt={`info-image-${props.person.name}-${props.person.image?.src}`}
          style={{
            width: "70%",
            objectFit: "contain",
            borderRadius: "50%",
          }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <div
          style={{
            // maxWidth: "70%",
            ...(isSmall && {
              paddingBottom: "5rem",
              // width: "80%",
            }),
            ...(!isSmall && {
              textAlign: props.left ? "left" : "right",
              width: "50%",
              ...(!isSmall && props.left
                ? { marginRight: "auto" }
                : { marginLeft: "auto" }),
            }),
          }}
        >
          <Typography variant="h4">{props.title}</Typography>
          <Typography variant="h3" className={CursiveFont.className}>
            {props.person.name}
          </Typography>
          {props.quote && (
            <>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                &quot;{props.quote.content}&quot;
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                - {props.quote.author}
              </Typography>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
