import { Check, Close, Delete } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Chip,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Switch,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { VoidExpression } from "typescript";
import { firestore } from "../../lib/firebase";
import { ModalForm } from "../ModalForm";
import { AddGuestForm } from "./AddGuestForm";
import { DeleteGuestForm } from "./DeleteGuestForm";
import { Category, Guest, InvitedBy } from "./types";

type Props = {
  label: string;
  guestList: Guest[];
};

type TableProps = {
  guestList: Guest[];
  editClicked: (guest: Guest) => void;
  deleteClicked: (guest: Guest) => void;
};
const Table = (props: TableProps) => {
  // const handleDelete = async (url: string) => {
  //   try {
  //     const ref = doc(firestore, "guests", url);
  //     await deleteDoc(ref);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const transformValue = (e: string | boolean | number) => {
    if (typeof e === "boolean") {
      return e ? (
        <Chip icon={<Check color="success" />} label="Yes" />
      ) : (
        <Chip icon={<Close color="error" />} label="No" />
      );
    } else return e.toString();
  };

  return props.guestList.length > 0 ? (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: "70%", margin: "auto" }}>
        <TableHead>
          <TableRow>
            {Object.keys(props.guestList[0]).map((field, i) => (
              <TableCell key={`field_${field}_i_${i}`}>{field} </TableCell>
            ))}
            <TableCell /> {/** Extra cell for the edit button */}
            <TableCell>Link</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.guestList.map((guest, i) => (
            <TableRow key={`guest_${guest.url}`} sx={{}}>
              {Object.keys(guest).map((key, i: number) => (
                <TableCell key={`value_${key}_i_${i}`}>
                  {/* {guest[key as keyof Guest].toString()} */}
                  {transformValue(guest[key as keyof Guest])}
                </TableCell>
              ))}
              <TableCell>
                <IconButton
                  size="large"
                  onClick={() => props.editClicked(guest)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  size={"large"}
                  onClick={() => {
                    const link = `${window.location.hostname}/${guest.url}`;
                    toast("Link copied: " + link);
                    navigator.clipboard.writeText(link);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  size={"large"}
                  onClick={() => {
                    props.deleteClicked(guest);
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  ) : (
    <h3>No Guests Available</h3>
  );
};

export const GuestTable = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [split, setSplit] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest>();

  return (
    <div>
      <h3>{props.label}</h3>
      <Button
        variant="contained"
        sx={{ marginBottom: "1rem" }}
        onClick={() => {
          setSelectedGuest(undefined);
          setOpen(true);
        }}
      >
        Add new guest
      </Button>
      <FormControlLabel
        sx={{ paddingLeft: "1rem", marginLeft: "1rem" }}
        control={<Switch value={split} onChange={(e, c) => setSplit(c)} />}
        label={split ? "Splitted" : "Combined"}
      />

      {split ? (
        <div>
          <Typography>Family</Typography>
          <Table
            guestList={props.guestList.filter((g) => g.type === "Family")}
            editClicked={(guest) => {
              setSelectedGuest(guest);
              setOpen(true);
            }}
            deleteClicked={(guest) => {
              setSelectedGuest(guest);
              setDeleteOpen(true);
            }}
          />
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }} />
          <Typography>Friends</Typography>
          <Table
            guestList={props.guestList.filter((g) => g.type === "Friend")}
            editClicked={(guest) => {
              setSelectedGuest(guest);
              setOpen(true);
            }}
            deleteClicked={(guest) => {
              setSelectedGuest(guest);
              setDeleteOpen(true);
            }}
          />
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }} />
          <Typography>Others</Typography>
          <Table
            guestList={props.guestList.filter((g) => g.type === "Others")}
            editClicked={(guest) => {
              setSelectedGuest(guest);
              setOpen(true);
            }}
            deleteClicked={(guest) => {
              setSelectedGuest(guest);
              setDeleteOpen(true);
            }}
          />
        </div>
      ) : (
        <Table
          guestList={props.guestList}
          editClicked={(guest) => {
            setSelectedGuest(guest);
            setOpen(true);
          }}
          deleteClicked={(guest) => {
            setSelectedGuest(guest);
            setDeleteOpen(true);
          }}
        />
      )}

      <ModalForm open={open} handleModalStatus={setOpen} title="Add Guest">
        <AddGuestForm close={() => setOpen(false)} guest={selectedGuest} />
      </ModalForm>

      <ModalForm
        open={deleteOpen}
        handleModalStatus={setDeleteOpen}
        title={`Confirm removing ${selectedGuest?.name} `}
      >
        <DeleteGuestForm
          close={() => setDeleteOpen(false)}
          guest={selectedGuest!}
        />
      </ModalForm>
    </div>
  );
};
