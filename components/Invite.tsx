import { styled } from "@mui/material";
import { useRef } from "react";
import { useConfig } from "../lib/useConfig";
import { useIsPortrait } from "../lib/useIsPortrait";
import { useMediaQuery } from "../lib/useMediaQuery";
import useOnScreen from "../lib/useOnScreen";

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
  backgroundColor: "#EFEBE9",
  transition: "background 1s ease-in",
});

const Layout = styled("div")<ComponentProps>({
  width: "100%",
  color: "black",
  textAlign: "center",
  // marginTop: "3.5%",
  animation: "fadein 2.5s",
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
})<ComponentProps>({
  marginLeft: "auto",
  marginRight: "auto",
  padding: "3rem 0",
  maxWidth: "70%",
});

const Header = styled("div")({
  backgroundImage: `linear-gradient(#db9f05, #db9f05), linear-gradient(#db9f05, #db9f05)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "1px 50%, 1px 50%",
  backgroundPosition: "left bottom, right bottom",
  position: "relative",
  zIndex: 1,
  fontSize: "2.5rem",
  "&::before": {
    position: "absolute",
    height: "1px",
    backgroundColor: "#db9f05",
    content: `""`,
    top: "50%",
    left: 0,
    width: "100%",
    zIndex: -1,
  },
});

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
  borderLeft: "1px solid #db9f05",
  borderRight: "1px solid #db9f05",
  borderBottom: "1px solid #db9f05",
});

const UpperText = styled("div")({
  maxWidth: "85%",
  textAlign: "center",
  margin: "0 auto 3rem",
  lineHeight: "120%",
});

const ThinLine = styled("div")({
  height: "0.1rem",
  width: "50%",
  backgroundColor: "#db9f05",
  margin: "1rem auto",
});

const InfoBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>(({ isPortrait, isSmall }) => ({
  border: "1px solid #db9f05",
  borderLeft: 0,
  borderRight: 0,
  padding: isSmall ? "1rem 1.5rem" : "2.5rem 3rem",
}));

const TextWrapper = ({
  text,
  isPortrait,
  isSmall,
  color,
}: {
  text: string;
  color?: string;
  isPortrait?: boolean;
  isSmall?: boolean;
}) => {
  return (
    <div
      style={{
        fontSize: isSmall ? "1em" : "2em",
        // marginBottom: "1.5rem",
        color: color,
      }}
    >
      <p>{text}</p>
    </div>
  );
};

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
          backgroundColor: onScreen ? "#EFEBE9" : "#DADADA",
          transition: "background 1s ease-in",
        }}
      >
        <InviteBox>
          <Header>
            <TitleLayout
              sx={{
                backgroundColor: onScreen ? "#EFEBE9" : "#DADADA",
                transition: "background 1s ease-in",
              }}
            >
              {/* Dear
              <br /> */}
              <span>{name}</span>
            </TitleLayout>
          </Header>
          <InnerBox>
            <UpperText>
              <h3>With joyful hearts we invite you to </h3>
              <h3>join us at our marriage ceremony and celebration </h3>
              <ThinLine />

              <InfoBox isSmall={isSm}>
                <div
                  style={{
                    margin: "1rem 0",
                    // paddingBottom: "1.5rem",
                    fontSize: isSm ? "1rem" : "2.5rem",
                  }}
                >
                  <p style={{ color: "#db9f05" }}>
                    {/* {reception.date.getDate().toLocaleString("en-AU", {
                      minimumIntegerDigits: 2,
                    })}{" "}
                    .{" "}
                    {(reception.date.getMonth() + 1).toLocaleString("en-AU", {
                      minimumIntegerDigits: 2,
                    })}{" "}
                    .{" "}
                    {reception.date.getFullYear().toLocaleString("en-AU", {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })} */}
                    {reception.date.toLocaleDateString("en-AU", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <TextWrapper
                  isSmall={isSm}
                  color="#db9f05"
                  text={`Ceremony at ${reception.date.toLocaleTimeString(
                    "en-AU",
                    { timeStyle: "short" }
                  )}`}
                />
                <div style={{ paddingBottom: "1.5rem" }} />
                <TextWrapper isSmall={isSm} text={reception.location} />
                <TextWrapper isSmall={isSm} text={reception.room ?? ""} />
                <p>{reception.address}</p>
              </InfoBox>
            </UpperText>
          </InnerBox>
        </InviteBox>
      </Layout>
    </Section>
  );
};
