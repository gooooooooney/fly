import { RadioGroup, Spacer } from "@nextui-org/react";
import { PageCard } from "./page-card";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { PageWidth } from "@/types";
import { saveProperty } from "@/lib/data-source/page";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { setPageWidth } from "@/hooks/store/create-layout-slice";
import {
  RadioProps,
  VisuallyHidden,
  useRadio,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-1 p-0",
        "transition-all duration-300 ease-in-out",
        "data-[selected=true]:border-blue-500/80"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span style={{ display: "none" }} {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div
        className="ml-0"
        style={{ marginLeft: 0 }}
        {...getLabelWrapperProps()}
      >
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};
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
    <RadioGroup

      value={pageWidth}
      onValueChange={(v) => savePageWidth(v as any)}
      orientation="horizontal"
      className="flex py-2 "
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
    // <DropdownMenuRadioGroup  onValueChange={v => savePageWidth(v as PageWidth)}>
    //   <DropdownMenuRadioItem value="default">
    //     <PageCard px="px-5" title={<span>Defalut</span>} />
    //   </DropdownMenuRadioItem>
    //   <DropdownMenuRadioItem value="wide">
    //     <PageCard px="px-4" title={<span>Wide</span>} />
    //   </DropdownMenuRadioItem>
    //   <DropdownMenuRadioItem value="full">
    //     <PageCard px="px-3" title={<span>Full</span>} />
    //   </DropdownMenuRadioItem>
    // </DropdownMenuRadioGroup>
  );
};
