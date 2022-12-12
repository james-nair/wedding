import { FormLabel, TextField, Typography } from "@mui/material";
import { useMediaQuery } from "../lib/useMediaQuery";

type Props = {
  accepted?: boolean;
  value: string;
  handleChange: (value: string) => void;
};

export const MessageForm = (props: Props) => {
  const isSmall = useMediaQuery("md");
  return (
    <>
      <Typography variant="h5" sx={{ mb: "1rem" }}>
        Message to the bride and groom:
      </Typography>
      <TextField
        multiline
        rows={5}
        sx={{ width: isSmall ? "100%" : "70%" }}
        inputProps={{ style: { fontFamily: "Clear Sans, cursive" } }}
        placeholder="Your Message Here"
        value={props.value}
        onChange={(e) => props.handleChange(e.currentTarget.value)}
      />
    </>
  );
};
