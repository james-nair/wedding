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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import debounce from "lodash.debounce";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { firestore } from "../../lib/firebase";
import { InvitedBy, Category, invitedBy, category, Guest } from "./types";
import toast from "react-hot-toast";
import { convertVietnameseToEnglishSlug } from "../../lib/stringHelpers";

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

type Props = {
  close: () => void;
  guest?: Guest; //editing if this is available
};
export const AddGuestForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(props.guest?.name);
  const [url, setUrl] = useState(props.guest?.url); //make sure to check if this is available
  const [isValid, setIsValid] = useState(!!props.guest);
  const [personNum, setPersonNum] = useState(props.guest?.partyOf);
  const [side, setSide] = useState(props.guest?.side);
  const [type, setType] = useState(props.guest?.type);

  useEffect(() => {
    //only check url if creating
    if (!props.guest) {
      checkUrl(url);
    }
  }, [url]);

  const checkUrl = useCallback(
    debounce(async (url?: string) => {
      if (url && url.length > 0) {
        //check ref if url exists
        const ref = doc(firestore, `guests/${url}`);
        const snap = await getDoc(ref);
        setIsValid(!snap.exists());
        setLoading(false);
      } else {
        setLoading(false);
        setIsValid(false);
      }
    }, 500),
    []
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!!personNum && !!side && !!type && !!url) {
        //set guests to db
        const ref = doc(firestore, "guests", url);
        const data = {
          name,
          url,
          estimated: personNum,
          partyOf: 0,
          side,
          type,
          confirmed: false,
          going: false,
        };
        await setDoc(ref, data);
        toast.success("Guest added!");
        props.close();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={(!loading && submit) || undefined}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            label="Name"
            sx={{ width: "100%" }}
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
              setUrl(convertVietnameseToEnglishSlug(e.currentTarget.value));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="URL"
            sx={{ width: "100%" }}
            InputLabelProps={{
              shrink: true,
            }}
            value={url}
            onChange={(e) => {
              setUrl(e.currentTarget.value);
              setLoading(true);
            }}
            // disabled={!!props.guest}
          />
        </Grid>
        {!props.guest && (
          <Grid item xs={12}>
            <UsernameMessage username={url ?? ""} isValid={isValid} />
          </Grid>
        )}

        <Grid item xs={4}>
          <TextField
            required
            label="Number of people"
            sx={{ width: "100%" }}
            value={personNum}
            type="number"
            inputProps={{ min: 1, max: 6 }}
            onChange={(e) => setPersonNum(parseFloat(e.currentTarget.value))}
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
              required
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
              required
              labelId="type-lable"
              label="Which type?"
              value={type}
              onChange={(e) => setType(e.target.value as Category)}
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
            <Button
              variant="outlined"
              sx={{ mr: "1rem" }}
              onClick={props.close}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={loading || !isValid}
            >
              {loading ? (
                <>
                  {" "}
                  <CircularProgress sx={{ color: "white", mr: "1rem" }} />{" "}
                  Loading{" "}
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
