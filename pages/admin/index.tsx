import { AuthWrapper } from "../../components/AuthWrapper";
import { useAuth } from "../../lib/UserAuth";

type AdminPageProps = {};

const AdminPage = (props: AdminPageProps) => {
  const { username, user } = useAuth();

  return (
    <main>
      <AuthWrapper>
        Hello, my username is {username}
        <div style={{ width: "100%" }}>{JSON.stringify(user)}</div>
      </AuthWrapper>
    </main>
  );
};

export default AdminPage;
