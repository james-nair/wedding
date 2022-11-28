import { useRouter } from "next/dist/client/router";

type UserPageProps = {};

const UserPage = (props: UserPageProps) => {
  const router = useRouter();
  const pathname = router.asPath;
  return (
    <main>
      <h1>Hello, {pathname}</h1>
    </main>
  );
};

export default UserPage;
