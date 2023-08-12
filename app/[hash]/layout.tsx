import PageTransitionLayout from "@/components/page-transition-layout";
import { PropsWithChildren } from "react";

export default function PageLayout(props: PropsWithChildren & {
  params: {
    hash: string
  }
}) {
  return (
    <PageTransitionLayout key={props.params.hash}>
      {props.children}
    </PageTransitionLayout>
  )
}