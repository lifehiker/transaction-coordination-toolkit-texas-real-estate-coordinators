import { NewTransactionClient } from "./NewTransactionClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Transaction | Texas TC Toolkit",
};

export default function NewTransactionPage() {
  return <NewTransactionClient />;
}
