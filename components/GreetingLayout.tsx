import { styled } from "@mui/material";
import { useRef } from "react";
import { Config } from "../config/info";
import { useConfig } from "../lib/useConfig";
import useOnScreen from "../lib/useOnScreen";

const isPortrait = window.matchMedia("(orientation: portrait)").matches;
const Layout = styled("div")({
  width: "100%",
  padding: isPortrait ? "30% 0% 15% 5%" : "5% 0% 5% 10%",
});

const Title = styled("p")({
  color: "#795548",
  width: "100%",
  fontSize: isPortrait ? "2.5em" : "3.5em",
  margin: 0,
  fontWeight: "500",
});

const SubTitle = styled("p")({
  color: "#795548",
  width: "100%",
  fontSize: isPortrait ? "1.2em" : "2em",
  margin: "24px 0",
  fontWeight: "300",
  lineHeight: 1.8,
});

export const GreetingLayout = () => {
  const ref = useRef<HTMLSelectElement>(null);
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, "-125px");
  const config = useConfig();
  return (
    <section
      ref={ref}
      style={{
        height: "100vh",
        background: onScreen ? "#EFEBE9" : "#DADADA",
        overflow: "hidden",
        position: "relative",
        transition: "background 1s ease-in",
      }}
    >
      <Layout>
        <Title>Welcome</Title>
        <SubTitle>
          co dau {config.bride.name}
          <br />
          chu re {config.groom.name}
          <br />
          <br />
          {/* 관심사도, 가치관도 달랐던 두 사람
      <br />
      사랑으로 닮은 꼴이 되어
      <br />
      인생이라는 여행을 함께 떠나려 합니다.
      <br />
      <br />
      따뜻한 격려와 축복으로
      <br />
      힘찬 출발의 자리를 빛내주시기 바랍니다.
      <br />
      <br />
      {config.groom.fatherName} · {config.groom.motherName}의 아들 {config.groom.name}
      <br />
      {config.bride.fatherName} · {config.bride.motherName}의 딸 {config.bride.name} */}
        </SubTitle>
      </Layout>
    </section>
  );
};
