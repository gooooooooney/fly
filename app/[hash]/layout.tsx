import { PropsWithChildren } from "react";

export default function PageLayout(props: PropsWithChildren) {
  return (
    <>
      {props.children}
    </>
  )
}