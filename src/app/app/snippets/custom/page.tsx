import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CustomSnippetsClient } from "./CustomSnippetsClient";

export default async function CustomSnippetsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const snippets = await db.customSnippet.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return <CustomSnippetsClient initialSnippets={snippets} />;
}
