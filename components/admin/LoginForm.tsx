import { async } from "@firebase/util";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { url } from "inspector";
import { FormEvent, useState } from "react";
import { auth, googleAuthProvider } from "../../lib/firebase";

const SignInButton = () => {
  const signinWithGoogle = async () => {
    try {
      let user = await signInWithPopup(auth, googleAuthProvider);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="btn-google" onClick={signinWithGoogle}>
      Sign in with google
    </button>
  );
};

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    try {
      let user = await signInWithEmailAndPassword(auth, username, password);
      console.log(user);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={(!loading && submit) || undefined}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            label="Username"
            sx={{ width: "100%" }}
            value={username}
            onChange={(e) => {
              setError("");
              setUsername(e.currentTarget.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            type="password"
            label="Password"
            sx={{ width: "100%" }}
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.currentTarget.value);
            }}
          />
        </Grid>
        {error !== "" && (
          <Grid item xs={12}>
            <p className="text-danger">{error}</p>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
          >
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
        </Grid>
      </Grid>
    </form>
  );
};
