import Link from "next/link";
import { ReactNode } from "react";
import { useAuth } from "../lib/UserAuth";

type Props = {
  children: ReactNode;
};
export const AuthWrapper = (props: Props) => {
  const { username } = useAuth();

  if (username) return <>{props.children}</>;

  return <Link href="/">You're not suppose to be here</Link>;
};
