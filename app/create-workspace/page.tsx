import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { WorkspaceForm } from "@/components/create-workspace/form";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";

export default async function CreateWorkspacePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin")
  }
  const wps = await getWorkspacesByUserId(session.user.id)
  if (wps.length > 0) {
    const activeWp = wps.find(wp => wp.isActive) || wps[0]
    redirect(`/${activeWp.pages[0].id}`)
  }
  return (
    <section className="flex items-center justify-center">
      <WorkspaceForm />
    </section>
  )
}