import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../lib/firebase";

type enterProps = {};

const EnterPage = (props: enterProps) => {
  const user = null;
  const username = null;
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

const UsernameForm = () => {
  return <></>;
};

export default EnterPage;
