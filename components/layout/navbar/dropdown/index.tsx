import { Icons } from "@/components/icons";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { saveProperty } from "@/lib/data-source/page";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  RadioProps,
  VisuallyHidden,
  useRadio,
} from "@nextui-org/react";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { PageWidthConfig } from "./page-width";
import { setEditable } from "@/hooks/store/create-content-slice";

const enum DropdownMenuKeys {
  LOCK = "lock",
  PAGE_WIDTH = "page-width",
}

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
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
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

const DropdownDataMenus = {
  editSection: [
    {
      key: DropdownMenuKeys.LOCK,
    },
  ],
};

export const DropdownMenus: FC = () => {
  const [editable] = useBoundStore((s) => [
    s.editable,
    ]);
  const pageId = useUuidPathname();
  const saveEditable = () => {
    setEditable(!editable);
    saveProperty({
      pageId,
      data: {
        editable: !editable,
      },
    });
  };
  const handleAction = (key: DropdownMenuKeys) => {
    switch (key) {
      case DropdownMenuKeys.LOCK: {
        saveEditable();
        break;
      }
      default:
    }
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <Icons.DotsHorizontal size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          base: "data-[hover=true]:bg-default-100/80",
        }}
        onAction={handleAction as any}
        aria-label="edit"
      >
        <DropdownSection showDivider>
          <DropdownItem
            textValue={DropdownMenuKeys.PAGE_WIDTH}
            endContent={<Icons.ChevronRightIcon />}
            key={DropdownMenuKeys.PAGE_WIDTH}
          >
            <PageWidthConfig />
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            textValue={DropdownMenuKeys.LOCK}
            key={DropdownMenuKeys.LOCK}
          >
            {editable ? "Lock page" : "Unlock page"}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
