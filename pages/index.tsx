import { GreetingLayout } from "../components/GreetingLayout";
import TitleLayout from "../components/TitleLayout";

export default function Home() {
  return (
    <main style={{ height: "100%" }}>
      <TitleLayout />
      <GreetingLayout />
    </main>
  );
}
