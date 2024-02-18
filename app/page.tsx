import { redirect } from "next/navigation";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import { addNewPage } from "@/prisma/services/pages/pages-services";
import { getUserAuth } from "@/lib/auth/utils";


export default async function Home() {
  const userAuth = await getUserAuth();
  if  (!userAuth.session) {
    redirect("/sign-in")
  }
  const workspaces = await getWorkspacesByUserId(userAuth?.session.user.id)
console.log(workspaces)
  if (workspaces.length === 0) {
    redirect("/create-workspace")
  }

  const activeWorkspace = workspaces.find(wp => wp.isActive) || workspaces[0]

  if (activeWorkspace.pages.length === 0) {
    const page = await addNewPage({
      spaceId: activeWorkspace.id,
      userId: userAuth?.session.user.id,
    })
    redirect(`/${page!.id}`)
  }

  
  redirect(`/${activeWorkspace.pages[0].id}`)
}
