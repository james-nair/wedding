import { doc } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import { useDocument } from "react-firebase-hooks/firestore";
import { Guest } from "../../components/admin/types";
import { firestore } from "../../lib/firebase";
import Home from "../index";

const UserPage = () => {
  const router = useRouter();
  const url = router.asPath.split("/")[1] ?? "no-route";
  const ref = doc(firestore, "guests", url);
  const [querySnapshot] = useDocument(ref);

  const guest = querySnapshot && (querySnapshot.data() as Guest);
  return <Home guest={guest} />;
};

export default UserPage;
