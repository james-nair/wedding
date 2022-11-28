import { useRouter } from "next/router";

type EditPageProps = {};

const EditPage = (props: EditPageProps) => {
  const router = useRouter();
  const pathname = router.asPath;
  return (
    <main>
      <h1>{pathname} Page</h1>
    </main>
  );
};

export default EditPage;
