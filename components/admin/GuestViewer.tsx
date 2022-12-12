import {
  AppBar,
  Box,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../lib/firebase";
import { GuestTable } from "./GuestTable";
import { Guest } from "./types";

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

type Comment = {
  guestUrl: string;
  guestName: string;
  message: string;
};

const CommentPanel = ({
  index,
  selectedValue,
  guestList,
}: {
  index: number;
  selectedValue: number;
  guestList: { url: string; name: string }[];
}) => {
  const [items, setItems] = useState<Comment[]>();
  useEffect(() => {
    let unsub;
    (async () => {
      let comRef = collection(firestore, "comments");
      unsub = onSnapshot(comRef, (snapshot) => {
        let results: Comment[] = [];
        snapshot.forEach((d) => {
          let data = d.data() as { guestId: string; message: string };
          results.push({
            guestUrl: data.guestId,
            guestName:
              guestList.find((g) => g.url === data.guestId)?.name ??
              "Cannot find name",
            message: data.message,
          });
        });

        setItems(results);
      });
    })();

    return unsub;
  }, [guestList]);

  return (
    <div hidden={index !== selectedValue}>
      {items && items.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "70%", margin: "auto" }}>
            <TableHead>
              <TableCell>Guest</TableCell>
              <TableCell>Comment</TableCell>
            </TableHead>
            <TableBody>
              {items?.map((item, i) => (
                <TableRow key={`comment-row-${i}`}>
                  <TableCell>{item.guestName}</TableCell>
                  <TableCell>{item.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h3>No Comments Available</h3>
      )}
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
          <Tab label="Comments" />
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
        <CommentPanel
          index={4}
          selectedValue={value}
          guestList={props.guests.map((g) => ({ url: g.url, name: g.name }))}
        />
      </div>
    </Box>
  );
};
