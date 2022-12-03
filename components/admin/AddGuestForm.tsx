import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { firestore } from "../../lib/firebase";
import { InvitedBy, Category, invitedBy, category } from "./types";

const UsernameMessage = ({
  username,
  isValid,
  loading,
}: {
  username: string;
  isValid?: boolean;
  loading?: boolean;
}) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
};

export const AddGuestForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState(""); //make sure to check if this is available
  const [isValid, setIsValid] = useState(false);
  const [personNum, setPersonNum] = useState();
  const [side, setSide] = useState<InvitedBy>();
  const [type, setType] = useState<Category>();

  useEffect(() => {
    checkUrl(url);
  }, [url]);

  const checkUrl = useCallback(
    debounce(async (url: string) => {
      const ref = doc(firestore, `guests/${url}`);
      const snap = await getDoc(ref);
      console.log("read firestore", snap.exists());
      setIsValid(!snap.exists());
      setLoading(false);
    }, 500),
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          label="Name"
          sx={{ width: "100%" }}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="URL"
          sx={{ width: "100%" }}
          value={url}
          onChange={(e) => {
            setLoading(true);
            setUrl(e.currentTarget.value);
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          label="Number of people"
          sx={{ width: "100%" }}
          value={personNum}
          type="number"
          inputProps={{ min: 1, max: 6 }}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="side-lable">Which side?</InputLabel>
          <Select
            labelId="side-lable"
            label="Which side?"
            value={side}
            onChange={(e) => setSide(e.target.value as InvitedBy)}
          >
            {invitedBy.map((item, i) => (
              <MenuItem key={`cat_item_${i}`} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="type-lable">Which type?</InputLabel>
          <Select
            labelId="type-lable"
            label="Which type?"
            value={type}
            onChange={(e) => setType(e.target.value as InvitedBy)}
          >
            {category.map((item, i) => (
              <MenuItem key={`cat_item_${i}`} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "flex-end",
            margin: "0 2%",
          }}
        >
          <Button variant="outlined" sx={{ mr: "1rem" }}>
            Cancel
          </Button>
          <Button variant="contained">
            {loading ? (
              <>
                {" "}
                <CircularProgress
                  sx={{ color: "white", mr: "1rem" }}
                /> Loading{" "}
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};
