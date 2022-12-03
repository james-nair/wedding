import { styled } from "@mui/material";
import { GuestTable } from "../../components/admin/GuestTable";
import { Guest } from "../../components/admin/types";
import { AuthWrapper } from "../../components/AuthWrapper";
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

  return (
    <main style={{ height: "100%" }}>
      <AuthWrapper>
        <Section>
          <Layout>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                padding: "3rem 0",
                maxWidth: "70%",
              }}
            >
              <GuestTable label={"Test"} guestList={[new Guest()]} />
              {/* Hello, my username is {username}
        <div style={{ width: "100%" }}>{JSON.stringify(user)}</div> */}
            </div>
          </Layout>
        </Section>
      </AuthWrapper>
    </main>
  );
};

export default AdminPage;
