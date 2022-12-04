import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { ModalForm } from "../ModalForm";
import { AddGuestForm } from "./AddGuestForm";
import { Category, Guest, InvitedBy, category, invitedBy } from "./types";

type Props = {
  label: string;
  guestList: Guest[];
};
export const GuestTable = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest>();
  if (props.guestList.length > 0) {
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "70%", margin: "auto" }}>
            <TableHead>
              <TableRow>
                {Object.keys(props.guestList[0]).map((field, i) => (
                  <TableCell key={`field_${field}_i_${i}`}>{field} </TableCell>
                ))}
                <TableCell /> {/** Extra cell for the edit button */}
              </TableRow>
            </TableHead>

            <TableBody>
              {props.guestList.map((guest, i) => (
                <TableRow key={`guest_${guest.url}`}>
                  {Object.values(guest).map((value, i: number) => (
                    <TableCell key={`value_${value}_i_${i}`}>{value}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalForm open={open} handleModalStatus={setOpen} title="Add Guest">
          <AddGuestForm close={() => setOpen(false)} guest={editingGuest} />
        </ModalForm>
      </div>
    );
  } else return <h3>No Guests Available</h3>;
};
