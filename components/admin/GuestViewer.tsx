import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { GuestTable } from "./GuestTable";
import { Guest, invitedBy } from "./types";

const TabPanel = ({
  index,
  selectedValue,
  guestList,
}: {
  index: number;
  selectedValue: number;
  guestList: Guest[];
}) => {
  return (
    <div hidden={index !== selectedValue}>
      <GuestTable guestList={guestList} />
    </div>
  );
};

type Props = { guests: Guest[] };

export const GuestViewer = (props: Props) => {
  const [value, setValue] = useState(0);
  return (
    <Box>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All guest" />
          <Tab label="Bride's guests" />
          <Tab label="Groom's guests" />
          <Tab label="Both guests" />
        </Tabs>
      </AppBar>
      <div style={{ marginTop: "2rem" }}>
        <TabPanel index={0} selectedValue={value} guestList={props.guests} />
        <TabPanel
          index={1}
          selectedValue={value}
          guestList={props.guests.filter((g) => g.side === "Bride")}
        />
        <TabPanel
          index={2}
          selectedValue={value}
          guestList={props.guests.filter((g) => g.side === "Groom")}
        />
        <TabPanel
          index={3}
          selectedValue={value}
          guestList={props.guests.filter((g) => g.side === "Both")}
        />
      </div>
    </Box>
  );
};
