import { Button, Grid, Typography } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { firestore } from "../../lib/firebase";
import { Guest } from "./types";

type Props = {
  guest: Guest;
  close: () => void;
};

export const DeleteGuestForm = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();

    try {
      const ref = doc(firestore, "guests", props.guest.url);
      await deleteDoc(ref);
      toast.success(`Successfully removed ${props.guest.url}`);
      props.close();
    } catch (error) {
      let e = new Error(error as string);
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={(!loading && submit) || undefined}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Are you sure you want to remove{" "}
            <b>
              <u>{props.guest.name}</u>
            </b>
            ?
          </Typography>
          <Typography variant="subtitle1">(url: {props.guest.url})</Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{ marginRight: "1rem" }}
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              sx={{ marginRight: "1rem" }}
              onClick={props.close}
            >
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
