import Nav from "@/components/layout/navbar/nav";
import PageTransitionLayout from "@/components/page-transition-layout";
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ListBar } from "@/components/layout/list-bar";
import Script from "next/script";
import TOC from "@/components/toc";
import { getSharePageSetting } from "@/prisma/services/pages/pages-services";

export default async function PageLayout(
  props: PropsWithChildren & {
    params: {
      hash: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  return (
    <section className=" h-screen">
      <Script src="https://unpkg.com/shiki"></Script>
      <section className="flex h-screen">

        {
          session?.user.id ? (
            <ListBar email={session.user.email || ""} />
          )
            : null
        }

        <section className="flex flex-col w-full">
          <Nav />
          <main className="w-full h-full relative overflow-y-auto overflow-x-hidden max-h-full">
            <PageTransitionLayout key={props.params.hash}>
              {props.children}
            </PageTransitionLayout>
          </main>

        </section>
      </section>
    </section>
  );
}
