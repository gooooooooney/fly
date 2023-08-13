import Nav from "@/components/layout/navbar/nav";
import { Sidebar } from "@/components/layout/sidebar";
import PageTransitionLayout from "@/components/page-transition-layout";
import { PropsWithChildren } from "react";

export default function PageLayout(
  props: PropsWithChildren & {
    params: {
      hash: string;
    };
  }
) {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Nav />
        <main className="w-full relative max-h-full">
          <PageTransitionLayout key={props.params.hash}>
            {props.children}
          </PageTransitionLayout>
        </main>
      </section>
    </section>
  );
}
