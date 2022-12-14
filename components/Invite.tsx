import { styled, Typography } from "@mui/material";
import { useRef } from "react";
import { useConfig } from "../lib/useConfig";
import { useIsPortrait } from "../lib/useIsPortrait";
import { useMediaQuery } from "../lib/useMediaQuery";
import useOnScreen from "../lib/useOnScreen";
import { BACKGROUND_COLOR, FADED_BACKGROUND } from "../styles/constant";
import BackgroundImage from "../assets/resized/BackgroundMulti.jpg";
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
});

const Layout = styled("div")<ComponentProps>({
  width: "100%",
  color: "black",
  textAlign: "center",
  // marginTop: "3.5%",
  // animation: "fadein 2.5s",
});

const GridLayout = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
  margin: "1rem 0",
  position: "relative",
  zIndex: 0,
  columnGap: 0,
});
const InviteBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>(({ isSmall }) => ({
  // marginLeft: "auto",
  // marginRight: "auto",
  width: "100%",
  marginTop: "5rem",
  marginBottom: "5rem",
  padding: "3rem 0",
  // maxWidth: isSmall ? "95%" : "80%",
  backgroundImage: `url(${BackgroundImage.src})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
}));

const Header = styled("div")({
  // backgroundImage: `linear-gradient(black, black), linear-gradient(black, black)`,
  // backgroundRepeat: "no-repeat",
  // backgroundSize: "1px 50%, 1px 50%",
  // backgroundPosition: "left bottom, right bottom",
  position: "relative",
  zIndex: 1,
  fontSize: "2.5rem",
  // "&::before": {
  //   position: "absolute",
  //   height: "1px",
  //   backgroundColor: "black",
  //   content: `""`,
  //   top: "50%",
  //   left: 0,
  //   width: "100%",
  //   zIndex: -1,
  // },
});

const CurvedBox = styled("div")<ComponentProps>(({ isPortrait, isSmall }) => ({
  maxWidth: isSmall ? "90%" : "40%",
  margin: "2rem auto",
  // paddingTop: "2rem",
  backgroundColor: FADED_BACKGROUND,
  borderRadius: "2rem 2rem 2rem 2rem",
}));

const Content = styled("div")<ComponentProps>(({ isPortrait, isSmall }) => ({
  maxWidth: "90%",
  margin: "1rem auto",
  padding: "2rem 0",
}));

const TitleLayout = styled("span", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>(({ isPortrait }) => ({
  padding: `0 1rem`,
  margin: "auto",
  maxWidth: "70%",
  display: "inline-block",
}));

const InnerBox = styled("div")({
  paddingTop: "2rem",
  // borderLeft: "1px solid black",
  // borderRight: "1px solid black",
  // borderBottom: "1px solid black",
});

const UpperText = styled("div")({
  maxWidth: "85%",
  textAlign: "center",
  margin: "0 auto 3rem",
  lineHeight: "120%",
});

const ThinLine = styled("div")({
  height: "1px",
  width: "50%",
  backgroundColor: "black",
  margin: "1rem auto",
});

const InfoBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>(({ isPortrait, isSmall }) => ({
  // border: "1px solid black",
  borderLeft: 0,
  borderRight: 0,
  // padding: isSmall ? "0.5rem 1rem" : "1.5rem 2rem",
  width: isSmall ? "90%" : "70%",
  height: "100%",
  margin: "0 auto",
}));

// const TextWrapper = ({
//   text,
//   isPortrait,
//   isSmall,
//   color,
// }: {
//   text: string;
//   color?: string;
//   isPortrait?: boolean;
//   isSmall?: boolean;
// }) => {
//   return (
//     <div
//       style={{
//         fontSize: isSmall ? "1.5rem" : "2.5rem",
//         // marginBottom: "1.5rem",
//         color: color,
//       }}
//     >
//       <p>{text}</p>
//     </div>
//   );
// };

type Props = {
  name: string;
};
export const Invite = ({ name }: Props) => {
  const ref = useRef<HTMLSelectElement>(null);
  const { reception } = useConfig();
  const onScreen = useOnScreen<HTMLDivElement>(ref, "-3%");
  const isPortrait = useIsPortrait();
  const isSm = useMediaQuery("md");

  return (
    <Section ref={ref}>
      <Layout
        sx={{
          backgroundColor: BACKGROUND_COLOR,
          // transition: "background 1s ease-in",
        }}
      >
        <InviteBox isSmall={isSm}>
          <CurvedBox isSmall={isSm}>
            <Content>
              <Header>
                <TitleLayout
                // sx={{
                //   backgroundColor: BACKGROUND_COLOR,
                //   // transition: "background 1s ease-in",
                // }}
                >
                  {/* Dear
              <br /> */}
                  <span>{name}</span>
                </TitleLayout>
              </Header>
              <InnerBox>
                <Typography variant="h6">
                  With joyful hearts we invite you to{" "}
                </Typography>
                <Typography variant="h6" sx={{ mb: "4rem" }}>
                  join us at our marriage ceremony and celebration
                </Typography>

                {/* <ThinLine /> */}

                <InfoBox isSmall={isSm}>
                  <Typography variant="h4" sx={{ mb: "2rem" }}>
                    {reception.date.toLocaleDateString("en-AU", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                  <Typography variant="h4" sx={{ mb: "4rem" }}>
                    {`At ${reception.date.toLocaleTimeString("en-AU", {
                      timeStyle: "short",
                    })}`}
                  </Typography>

                  <Typography variant="h5" sx={{ mb: "2rem" }}>
                    {reception.location}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: "2rem" }}>
                    {reception.room ?? ""}
                  </Typography>

                  <Typography variant="h6" sx={{ mb: "2rem" }}>
                    {reception.address}
                  </Typography>
                  {/* <p>{reception.address}</p> */}
                </InfoBox>
              </InnerBox>
            </Content>
          </CurvedBox>
        </InviteBox>
      </Layout>
    </Section>
  );
};
