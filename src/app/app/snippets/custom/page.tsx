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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Custom Snippets</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage your own custom communication templates.
        </p>
      </div>
      <CustomSnippetsClient initialSnippets={snippets} />
    </div>
  );
}
