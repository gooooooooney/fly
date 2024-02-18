import { redirect } from "next/navigation";
import { WorkspaceForm } from "@/components/create-workspace/form";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import { getUserAuth } from "@/lib/auth/utils";

export default async function CreateWorkspacePage() {
  const userAuth = await getUserAuth();
  if (!userAuth.session) {
    redirect("/sign-in")
  }
  const wps = await getWorkspacesByUserId(userAuth.session.user.id)
  // const wps = [] as any
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