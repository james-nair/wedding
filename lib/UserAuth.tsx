import { User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
type UserAuthContextType = {
  username: string | null;
  user?: User | null;
};

const UserAuthContext = createContext({} as UserAuthContextType);
export const useAuth = () => useContext(UserAuthContext);

type UserAuthProps = {
  children: ReactNode;
};
export const UserAuth = (props: UserAuthProps) => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  const value: UserAuthContextType = {
    user,
    username,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {props.children}
    </UserAuthContext.Provider>
  );
};
