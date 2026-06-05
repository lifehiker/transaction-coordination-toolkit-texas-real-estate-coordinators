import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AppSidebar } from "@/components/app/AppSidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AppSidebar />
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
      </div>
    </div>
  );
}
