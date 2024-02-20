import Nav from "@/components/layout/navbar/nav";
import PageTransitionLayout from "@/components/page-transition-layout";
import { PropsWithChildren } from "react";
import { ListBar } from "@/components/layout/list-bar";
import Script from "next/script";
import { getUserAuth } from "@/lib/auth/utils";

export default async function PageLayout(
  props: PropsWithChildren & {
    params: {
      spaceName: string;
    };
  }
) {
  const userAuth = await getUserAuth();

  return (
    <section className=" h-screen">
      {/* <Script src="https://unpkg.com/shiki"></Script> */}
      <section className="flex h-screen">

        <ListBar spaceName={props.params.spaceName} email={userAuth.session?.user.email || ""} />

        <section className="flex flex-col w-full">
          <Nav />
          <main className="w-full h-full relative overflow-y-auto overflow-x-hidden max-h-full">
            <PageTransitionLayout key={props.params.spaceName}>
              {props.children}
            </PageTransitionLayout>
          </main>

        </section>
      </section>
    </section>
  );
}
