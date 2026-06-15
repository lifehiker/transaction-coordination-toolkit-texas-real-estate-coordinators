import { LoginClient } from "./LoginClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Texas TC Toolkit",
};

export default function LoginPage() {
  return <LoginClient />;
}
