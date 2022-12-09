import { AboutUs } from "../components/AboutUs";
import { Guest } from "../components/admin/types";
import { Confirmation } from "../components/Confirmation";
import { Gallery } from "../components/Gallery";
import { Invite } from "../components/Invite";
import { Timeline } from "../components/Timeline";
import TitleLayout from "../components/TitleLayout";

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
      <AboutUs />
      <Confirmation guest={guest} />
    </main>
  );
}
