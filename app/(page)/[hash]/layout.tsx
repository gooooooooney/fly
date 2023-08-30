import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import {
  getPageById,
} from "@/prisma/services/pages/pages-services";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function PageLayout(
  props: PropsWithChildren & {
    params: {
      hash: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const wps = await getWorkspacesByUserId(session.user.id);
  if (wps.length === 0) {
    redirect("/create-workspace");
  }
  const page = await getPageById(props.params.hash);
  if (!page) {
    redirect("/");
  }

  return (
    <section data-spaceid={page.workspaceId} id="spaceid">{props.children}</section>
  );
}
