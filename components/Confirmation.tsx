import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  OutlinedInput,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import { textAlign } from "@mui/system";
import { doc, setDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { firestore } from "../lib/firebase";
import { useMediaQuery } from "../lib/useMediaQuery";
import { Guest } from "./admin/types";
import { SelectButton } from "./SelectButton";

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
  transition: "background 1s ease-in",
});

const TitleLayout = styled("span", {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>(({ isPortrait }) => ({
  padding: `0 1rem`,
  margin: "auto",
  maxWidth: "70%",
  display: "inline-block",
  fontSize: "2.5rem",
}));

const FormBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "isPortrait" && prop !== "isSmall",
})<ComponentProps>({
  marginLeft: "auto",
  marginRight: "auto",
  padding: "3rem 0",
  maxWidth: "70%",
  textAlign: "center",
});

const Subtitle = styled("div")({
  maxWidth: "85%",
  textAlign: "center",
  margin: "0 auto 3rem",
  lineHeight: "120%",
});

type Props = {
  guest?: Guest;
};
export const Confirmation = (props: Props) => {
  const isSm = useMediaQuery("md");
  const [value, setValue] = useState<boolean>();
  const [num, setNum] = useState(0);
  const [selected, setSelected] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.guest) {
      try {
        const ref = doc(firestore, "guests", props.guest.url);
        const data: Guest = {
          ...props.guest,
          confirmed: true,
          partyOf: num,
          going: value ?? false,
        };

        console.log("confirming....", data);
        await setDoc(ref, data);
        toast.success("Thank you for your response!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={submit}>
      <Section>
        <FormBox>
          <TitleLayout sx={{ backgroundColor: "#EFEBE9" }}>
            <span>Will you make it?</span>
          </TitleLayout>
          <Subtitle>
            <h3>We would love for you to join us there for our special day</h3>
            <h3>Please kindly reply. We cannot wait to see you!</h3>
          </Subtitle>
          <Grid container spacing={5}>
            {/* <Grid item xs={12}>
            <FormControl>
              <RadioGroup row name="rsvp">
                <FormControlLabel
                  value={true}
                  control={
                    <Radio
                      size="medium"
                      onChange={(e, checked) => setValue(true)}
                    />
                  }
                  label={"Accepts with pleasure"}
                  labelPlacement="bottom"
                />

                <FormControlLabel
                  value={false}
                  control={
                    <Radio
                      size="medium"
                      onChange={(e, v) => {
                        setValue(false);
                        setNum(0);
                      }}
                    />
                  }
                  label={"Decline with regrets"}
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid> */}
            <Grid item xs={3} />
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <SelectButton
                selectedId={selected}
                onClick={function (id: string): void {
                  setSelected(id);
                  setValue(true);
                }}
                id="yes"
              >
                Accepts with pleasure
              </SelectButton>

              <SelectButton
                selectedId={selected}
                onClick={function (id: string): void {
                  setSelected(id);
                  setValue(false);
                  setNum(0);
                }}
                id="no"
              >
                Decline with regrets
              </SelectButton>
            </Grid>
            <Grid item xs={3} />
            {value === undefined ? (
              <></>
            ) : value ? (
              <Grid item xs={12}>
                <Subtitle>
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "3rem",
                    }}
                  >
                    Awesome! &#127881; How many people are coming?{" "}
                    <FormControl
                      sx={{
                        width: "5rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <OutlinedInput
                        placeholder="0"
                        type="number"
                        inputProps={{ min: 1, max: 6 }}
                        onChange={(e) =>
                          setNum(parseFloat(e.currentTarget.value))
                        }
                      />
                    </FormControl>
                  </h3>
                </Subtitle>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Subtitle>
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "3rem",
                    }}
                  >
                    Aw &#128549; that's okay. Do let us know if you change your
                    mind &#128523;
                  </h3>
                </Subtitle>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                disabled={value === undefined}
                sx={{
                  backgroundImage:
                    "linear-gradient(92deg, rgba(236,191,76,1) 0%, rgba(219,159,5,1) 59%, rgba(226,154,45,1) 100%);",
                  borderRadius: "1rem",
                  fontSize: "1.25rem",
                  fontWeight: "500",
                  padding: isSm ? "1rem 1.6rem" : "1rem 2.6rem",
                  textAlign: "center",
                  touchAction: "manipulation",
                }}
              >
                Send
              </Button>
            </Grid>
          </Grid>{" "}
        </FormBox>
      </Section>
    </form>
  );
};
