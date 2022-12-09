import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

import { useMediaQuery } from "../lib/useMediaQuery";
import { TextFont } from "../styles/constant";

export type TimelineItem = {
  title: string;
  subTitle?: string;
  time: Date;
  icon: ReactNode;
};

type Props = {
  items: TimelineItem[];
};

const isEven = (num: number) => num % 2 == 0;

export const CustomTimeline = (props: Props) => {
  const isSm = useMediaQuery("md");
  return (
    <Timeline
      position="alternate"
      className={TextFont.className}
      sx={{ paddingTop: 0, pb: "2rem", mt: 0 }}
    >
      {props.items.map((item, i) => (
        <TimelineItem key={`timeline_${item.title}_${i}`}>
          <TimelineOppositeContent
            sx={{ m: "auto 0 0" }}
            {...(isEven(i) && { align: "right" })}
            variant="h5"

            // sx={{ display: "flex", alignItems: "flex-end" }}
          >
            {item.time.toLocaleTimeString("en-AU", { timeStyle: "short" })}{" "}
            {item.time.toLocaleDateString("en-AU")}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ ...(i > 0 ? { height: "5rem" } : {}) }} />
            <TimelineDot>{item.icon}</TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ m: "auto 0 0" }}>
            <Typography variant={isSm ? "h6" : "h5"} component="span">
              <b>{item.title}</b>
            </Typography>
            {item.subTitle && <Typography>{item.subTitle}</Typography>}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
