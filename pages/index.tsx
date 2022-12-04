import { collection, doc, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Confirmation } from "../components/Confirmation";
import { Gallery } from "../components/Gallery";
import { GreetingLayout } from "../components/GreetingLayout";
import { Invite } from "../components/Invite";
import { Timeline } from "../components/Timeline";
import TitleLayout from "../components/TitleLayout";
import { firestore } from "../lib/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Guest } from "../components/admin/types";
export default function Home() {
  const router = useRouter();
  const url = router.asPath.split("/")[1];
  const [name, setName] = useState<string>();
  const ref = doc(firestore, "guests", url);
  const [querySnapshot] = useDocument(ref);

  const guest = querySnapshot && (querySnapshot.data() as Guest);

  return (
    <main style={{ height: "100%" }}>
      <TitleLayout />
      {/* <GreetingLayout /> */}
      <Gallery />
      <Invite name={guest?.name ?? ""} />
      <Timeline />
      <Confirmation guest={guest} />
    </main>
  );
}
