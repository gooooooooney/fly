"use client"
import { cn } from "@nextui-org/system";
import { Separator } from "@radix-ui/react-separator";
import IconAndCover from "./icon-cover";
import { PageTitle } from "./page-title";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { usePageInit } from "@/hooks/use-page-init";
import EditorWrapper from "@/components/editor";

import { useEffect } from "react";
import { useUnmount } from "react-use";

export default function PageWrapper({id}: {id: string}) {
  const { data } = usePageInit();
  const [pageWidth] = useBoundStore( (state) => [state.pageWidth]);
  useEffect(() => {
    if (data) {
      useBoundStore.setState({
        blocks: (data?.blocks as any) || [],
        workspaceId: data?.workspaceId || "",
      });
    }
  }, [data]);

  useUnmount(() => {
    useBoundStore.setState({
      blocks: [],
    });
  });
  return (
    <section
      className={cn(
        ["mx-auto flex flex-col  flex-grow", "transition-width duration-300"],
        {
          "w-[820px]": pageWidth == "default",
          "w-[1020px]": pageWidth == "wide",
          "w-[1200px]": pageWidth == "full",
        }
      )}
    >
      <div className="flex flex-col w-full">
        <div className="group">
          <IconAndCover id={id} />
          <PageTitle id={id} />
        </div>
      </div>
      <Separator />
      <section className=" flex-grow flex flex-col mt-8">
        <EditorWrapper />
      </section>
    </section>
  );
}
