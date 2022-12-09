import { Box, Grid, styled, Typography } from "@mui/material";
import { useConfig } from "../lib/useConfig";
import {
  BACKGROUND_COLOR,
  FADED_BACKGROUND,
  TitleLayout,
} from "../styles/constant";
import { CustomTimeline, TimelineItem } from "./CustomTimeline";
import { DoubleHappyIcon } from "./icons/DoubleHappy";
import { RingsIcon } from "./icons/Rings";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useMediaQuery } from "../lib/useMediaQuery";
import BackgroundImage from "../assets/BackgroundMulti.jpg";

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
  padding: "1rem 0 3rem 0",
  backgroundImage: `url(${BackgroundImage.src})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
});

const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "isSmall" && prop !== "isPortrait",
})<ComponentProps>(({ isSmall }) => ({
  maxWidth: isSmall ? "90%" : "40%",
  margin: "0 auto",
  backgroundColor: FADED_BACKGROUND,
  borderRadius: isSmall ? "35% 35% 1px 1px" : "2rem",
}));

// const TitleLayout = styled("span", {
//   shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
// })<ComponentProps>(({ isPortrait, isSmall }) => ({
//   padding: `0 1rem`,
//   margin: "auto",
//   maxWidth: isSmall ? "95%" : "80%",
//   display: "inline-block",
//   fontSize: "2.5rem",
// }));

const EventLine = styled("div")({
  height: "3rem",
  width: "1px",
  backgroundColor: "#675e5e",
  position: "relative",
  left: "50%",
  "&::after": {
    content: '""',
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#675e5e",
    transform: "translateX(-50%)",
    bottom: "-5px",
    position: "absolute",
  },
});

type LeftOrRight =
  | {
      left: boolean;
      right?: never;
    }
  | { left?: never; right: boolean };

type SquareProps = LeftOrRight;

const EventSquare = styled("div", {
  shouldForwardProp: (prop) => prop !== "left" && prop !== "right",
})<SquareProps>(({ left, right }) => ({
  left: left ? "-0.1rem" : undefined,
  right: right ? "-0.1rem" : undefined,
  width: 0,
  height: 0,
  border: "5px solid transparent",
  borderBottomColor: "#675e5e",
  position: "absolute",
  bottom: "-0.5px",
  "&::after": {
    content: '""',
    left: "-5px",
    top: "5px",
    width: 0,
    height: 0,
    border: "5px solid transparent",
    borderTopColor: "#675e5e",
    position: "absolute",
  },
}));

const EventItem = ({
  time,
  eventName,
  left,
  right,
}: {
  time: Date;
  eventName: string;
  left?: boolean;
  right?: boolean;
}) => {
  return (
    <Grid item xs={12} md={4}>
      <div style={{ position: "relative" }}>
        <Date
          time={time}
          {...(left
            ? { haveLeftSquare: true }
            : right
            ? { haveRightSquare: true }
            : {})}
        />
        <EventName name={eventName} />
      </div>
    </Grid>
  );
};

const Date = ({
  time,
  haveLeftSquare,
  haveRightSquare,
}: {
  time: Date;
  haveLeftSquare?: boolean;
  haveRightSquare?: boolean;
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          height: "1px",
          left: 0,
          right: 0,
          backgroundColor: "#675e5e",
        },
      }}
    >
      <Typography>
        {time.toLocaleTimeString("en-AU", { timeStyle: "short" })}
      </Typography>
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          margin: "auto",
          whiteSpace: "pre-line",
        }}
      >
        {time.toLocaleDateString("en-AU")}
      </Typography>
      <EventLine />

      {haveLeftSquare ? (
        <EventSquare left />
      ) : haveRightSquare ? (
        <EventSquare right />
      ) : null}
    </Box>
  );
};

const EventName = ({ name }: { name: string }) => {
  return (
    <div style={{ marginTop: "1.5rem", width: "100%", padding: "0 0 0.5rem" }}>
      {name}
    </div>
  );
};

export const Timeline = () => {
  const config = useConfig();
  const isSmall = useMediaQuery("md");
  const items: TimelineItem[] = [
    {
      title: "Traditional Ceremonies",
      time: config.traditional.date,
      icon: <DoubleHappyIcon />,
      // subTitle: "Because you need rest",
    },
    {
      title: "Welcome Guests",
      time: config.reception.date,
      icon: <RingsIcon />,
      // subTitle: "Because you need rest",
    },
    {
      title: "Reception",
      time: config.reception.meal ?? config.reception.date,
      icon: <RestaurantIcon sx={{ color: "black" }} />,
      subTitle: "Ceremony and dinner",
    },
  ];
  return (
    <Section>
      <Container isSmall={isSmall}>
        <TitleLayout variant="h1">Timeline</TitleLayout>
        <CustomTimeline items={items} />
        {/* <Grid container spacing={1}>
          <EventItem
            eventName="Traditional Ceremony"
            time={config.traditional.date}
            left
          />
          <EventItem
            eventName="Welcoming Guests"
            time={config.reception.date}
          />
          <EventItem
            eventName="Ceremony and Reception"
            time={config.reception.date}
            right
          />
        </Grid> */}
      </Container>
    </Section>
  );
};
