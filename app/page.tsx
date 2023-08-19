import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import { addNewPage } from "@/prisma/services/pages/pages-services";


export default async function Home() {
  const session = await getServerSession(authOptions);
  if  (!session) {
    redirect("/signin")
  }
  const workspaces = await getWorkspacesByUserId(session.user.id)

  if (workspaces.length === 0) {
    redirect("/create-workspace")
  }

  const activeWorkspace = workspaces.find(wp => wp.isActive) || workspaces[0]

  if (activeWorkspace.pages.length === 0) {
    const page = await addNewPage({
      spaceId: activeWorkspace.id,
    })
    redirect(`/${page!.id}`)
  }

  
  redirect(`/${activeWorkspace.pages[0].id}`)
}
