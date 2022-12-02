import { Box, Grid, styled, Typography } from "@mui/material";
import { useConfig } from "../lib/useConfig";

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
  marginBottom: "1rem",
  textAlign: "center",
  padding: "1rem 0 3rem 0",
});

const Container = styled("div")({
  maxWidth: "80%",
  margin: "0 auto",
});

const TitleLayout = styled("span", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>(({ isPortrait }) => ({
  padding: `0 1rem`,
  margin: "auto",
  maxWidth: "70%",
  display: "inline-block",
  fontSize: "2.5rem",
}));

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
        {time.toLocaleTimeString(undefined, { timeStyle: "short" })}
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
  return (
    <Section>
      <Container>
        <TitleLayout>Timeline</TitleLayout>
        <Grid container spacing={1}>
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
        </Grid>
      </Container>
    </Section>
  );
};
