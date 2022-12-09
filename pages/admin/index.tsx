import { Button, styled } from "@mui/material";
import { signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GuestTable } from "../../components/admin/GuestTable";
import { GuestViewer } from "../../components/admin/GuestViewer";
import { Guest } from "../../components/admin/types";
import { AuthWrapper } from "../../components/AuthWrapper";
import { auth, firestore } from "../../lib/firebase";
import { useAuth } from "../../lib/UserAuth";

interface ComponentProps {
  isPortrait?: boolean;
  isSmall?: boolean;
}
const Section = styled("section", {
  shouldForwardProp: (prop) => prop !== "isPortrait",
})<ComponentProps>({
  height: "100%",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "#EFEBE9",
  transition: "background 1s ease-in",
});

const Layout = styled("div")<ComponentProps>({
  width: "100%",
  color: "black",
  textAlign: "center",
  // marginTop: "3.5%",
  animation: "fadein 2.5s",
});

type AdminPageProps = {};

const AdminPage = (props: AdminPageProps) => {
  const { username, user } = useAuth();

  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    let unsub;
    (async () => {
      let guestsRef = collection(firestore, "guests");
      unsub = onSnapshot(guestsRef, (doc) => {
        let results: Guest[] = [];
        doc.forEach((d) => {
          let g = new Guest(d.data() as Guest);
          results.push(g);
        });

        setGuests(results);
      });
    })();

    return unsub;
  }, []);

  return (
    <main style={{ height: "100%" }}>
      <AuthWrapper>
        <Section>
          <Button
            variant="contained"
            onClick={() => {
              let res = signOut(auth);
            }}
          >
            Log out
          </Button>
          <Layout>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                padding: "3rem 0",
                maxWidth: "70%",
              }}
            >
              {/* <GuestTable label={"Guest List"} guestList={guests} /> */}
              <GuestViewer guests={guests} />
            </div>
          </Layout>
        </Section>
      </AuthWrapper>
    </main>
  );
};

export default AdminPage;
