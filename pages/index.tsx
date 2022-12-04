import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Guest } from "../components/admin/types";
import { Confirmation } from "../components/Confirmation";
import { Gallery } from "../components/Gallery";
import { Invite } from "../components/Invite";
import { Timeline } from "../components/Timeline";
import TitleLayout from "../components/TitleLayout";
import { firestore } from "../lib/firebase";
export default function Home() {
  const router = useRouter();
  const url = router.asPath.split("/")[1];
  const ref = url !== "" ? doc(firestore, "guests", url) : undefined;
  const [querySnapshot] = ref ? useDocument(ref) : [undefined];

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
