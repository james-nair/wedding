import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { useAuth } from "../lib/UserAuth";
import debounce from "lodash.debounce";
type enterProps = {};

const EnterPage = (props: enterProps) => {
  const { user, username } = useAuth();
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

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

const SignOutButton = () => {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
};

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

const UsernameForm = () => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    checkUsername(value);
  }, [value]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setLoading(true);
    setValue(value);
  };
  const submit = async (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    //doc reference
    const userDoc = doc(firestore, `users/${user?.uid}`);
    const usernameDoc = doc(firestore, `usernames`, value);

    //batch change to db
    try {
      const batch = writeBatch(firestore);
      batch.set(userDoc, {
        username: value,
        photoUrl: "",
        displayName: user?.displayName,
      });

      batch.set(usernameDoc, { uid: user?.uid });

      await batch.commit();
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length > 3) {
        //check ref in db
        const ref = doc(firestore, `usernames/${username}`);
        const snap = await getDoc(ref);
        console.log("Read firestore: ", snap.exists());
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <section>
      <h3>Choose Username</h3>
      <form onSubmit={submit}>
        <input
          name="username"
          placeholder="username"
          value={value}
          onChange={onChange}
        />
        <UsernameMessage username={value} isValid={isValid} loading={loading} />
        <button type="submit" className="btn-green" disabled={!isValid}>
          Choose
        </button>
      </form>
      <div>
        <h4>Debug</h4>
        <div>
          Username: {value}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </div>
    </section>
  );
};

export default EnterPage;
