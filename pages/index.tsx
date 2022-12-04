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

type HomeProps = {
  guest?: Guest;
};
export default function Home({ guest }: HomeProps) {
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
