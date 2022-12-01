import { Gallery } from "../components/Gallery";
import { GreetingLayout } from "../components/GreetingLayout";
import { Invite } from "../components/Invite";
import TitleLayout from "../components/TitleLayout";

export default function Home() {
  return (
    <main style={{ height: "100%" }}>
      <TitleLayout />
      {/* <GreetingLayout /> */}
      <Gallery />
      <Invite name="James Nair" />
    </main>
  );
}
