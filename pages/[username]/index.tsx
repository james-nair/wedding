import { useRouter } from "next/dist/client/router";
import Home from "..";

type UserPageProps = {};

const UserPage = (props: UserPageProps) => {
  const router = useRouter();
  const pathname = router.asPath;
  return <Home />;
};

export default UserPage;
