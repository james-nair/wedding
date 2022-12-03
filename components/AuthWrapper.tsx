import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";
import { useAuth } from "../lib/UserAuth";
import { LoginForm } from "./admin/LoginForm";

type Props = {
  children: ReactNode;
};
export const AuthWrapper = (props: Props) => {
  const { username, user } = useAuth();
  const isSm = useMediaQuery("md");

  if (user) return <>{props.children}</>;

  if (user === null)
    return (
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          padding: "3rem 0",
          maxWidth: isSm ? "70%" : "40%",
        }}
      >
        <h3>Login To Admin Portal</h3>
        <LoginForm />
      </div>
    );

  return <></>;
};
