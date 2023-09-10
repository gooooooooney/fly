import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { RadioGroup, Spacer } from "@nextui-org/react";
import { CustomRadio } from "..";
import { PageCard } from "./page-card";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { PageWidth } from "@/types";
import { saveProperty } from "@/lib/data-source/page";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { setPageWidth } from "@/hooks/store/create-layout-slice";

export const PageWidthConfig = () => {
  const [pageWidth] = useBoundStore((s) => [
    s.pageWidth,
  ]);
  const pageId = useUuidPathname();
  const savePageWidth = (pageWidth: PageWidth) => {
    setPageWidth(pageWidth);
    saveProperty({
      pageId,
      data: {
        pageWidth,
      },
    });
  };
  return (
    <Popover
      placement="left-start"
      size="sm"
      radius="sm"
      offset={20}
      triggerType="grid"
    >
      <PopoverTrigger>Page width</PopoverTrigger>
      <PopoverContent>
        <RadioGroup
    
          value={pageWidth}
          onValueChange={(v) => savePageWidth(v as any)}
          orientation="horizontal"
          className="flex py-2"
        >
          <CustomRadio value="default">
            <PageCard px="px-5" title={<span>Defalut</span>} />
          </CustomRadio>
          <Spacer y={1} x={1} />

          <CustomRadio value="wide">
            <PageCard px="px-4" title={<span>Wide</span>} />
          </CustomRadio>

          <Spacer x={1} y={1} />
          <CustomRadio value="full">
            <PageCard px="px-3" title={<span>Full</span>} />
          </CustomRadio>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};
