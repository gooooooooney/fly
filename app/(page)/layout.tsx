import Nav from "@/components/layout/navbar/nav";
import PageTransitionLayout from "@/components/page-transition-layout";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ListBar } from "@/components/layout/list-bar";
import Script from "next/script";

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

        <ListBar email={session?.user.email || ""} />

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
