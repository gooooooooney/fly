import { PropsWithChildren } from "react";
import { ResolvingMetadata, Metadata } from "next";
import { getPropsByPageId } from "@/prisma/services/props/props-service";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

const getShortcutIcon = (icon: string) => {
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>`
}

export async function generateMetadata(
  { params }: {params: {
    spaceName: string,
    hash: string
  }},
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.hash

  // fetch data
  const pageInfo = await getPropsByPageId(id)

  return {
    title: pageInfo?.title || "Untitled",
    icons: {
      shortcut: getShortcutIcon(pageInfo?.emoji || "🐠"),
    },
  }
}

export default async function PageLayout(
  props: PropsWithChildren & {
    params: {
      hash: string;
      spaceName: string;
    };
  }
) {
  const userAuth = await getUserAuth();

  const wps = await getWorkspacesByUserId(userAuth.session?.user.id)
  
  const activeWp = wps.find(wp => wp.isActive) || wps[0]
  let spaceName = activeWp.name

  if (!userAuth.session) {
    spaceName = props.params.spaceName
  }
  if (wps.length > 0) {
    if (props.params.spaceName !== activeWp.name) {
      // redirect to the active workspace
      redirect(`/${activeWp.name}/${activeWp.pages[0].id}`)
    }
  }


  return (
    <section data-space-name={spaceName} id="spaceid">{props.children}</section>
  );
}
