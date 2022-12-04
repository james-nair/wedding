import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { ModalForm } from "../ModalForm";
import { AddGuestForm } from "./AddGuestForm";
import { Guest } from "./types";

type Props = {
  label: string;
  guestList: Guest[];
};
export const GuestTable = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest>();

  return (
    <div>
      <h3>{props.label}</h3>
      <Button
        variant="contained"
        sx={{ marginBottom: "1rem" }}
        onClick={() => {
          setEditingGuest(undefined);
          setOpen(true);
        }}
      >
        Add new guest
      </Button>

      {props.guestList.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "70%", margin: "auto" }}>
            <TableHead>
              <TableRow>
                {Object.keys(props.guestList[0]).map((field, i) => (
                  <TableCell key={`field_${field}_i_${i}`}>{field} </TableCell>
                ))}
                <TableCell /> {/** Extra cell for the edit button */}
                <TableCell>Link</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {props.guestList.map((guest, i) => (
                <TableRow key={`guest_${guest.url}`}>
                  {Object.keys(guest).map((key, i: number) => (
                    <TableCell key={`value_${key}_i_${i}`}>
                      {guest[key as keyof Guest].toString()}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton
                      size="large"
                      onClick={() => {
                        setEditingGuest(guest);
                        setOpen(true);
                      }}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h3>No Guests Available</h3>
      )}

      <ModalForm open={open} handleModalStatus={setOpen} title="Add Guest">
        <AddGuestForm close={() => setOpen(false)} guest={editingGuest} />
      </ModalForm>
    </div>
  );
};
