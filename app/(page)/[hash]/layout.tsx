import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import {
  getPageById,
} from "@/prisma/services/pages/pages-services";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { ResolvingMetadata, Metadata } from "next";
import { getPropsByPageId } from "@/prisma/services/props/props-service";

const getShortcutIcon = (icon: string) => {
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>`
}

export async function generateMetadata(
  { params }: {params: {hash: string}},
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.hash

  // fetch data
  const pageInfo = await getPropsByPageId(id)

  return {
    title: pageInfo?.title,
    icons: {
      shortcut: getShortcutIcon(pageInfo?.emoji || "🐠"),
    },
  }
}

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
