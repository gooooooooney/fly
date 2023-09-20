"use client";
import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Session } from "next-auth";
import { Breadcrumbs } from "./breadcrumbs";
import { DropdownMenus } from "./dropdown";
import { setCollapsed } from "@/hooks/store/create-layout-slice";
import { Share } from "./share";
import { usePageInit } from "@/hooks/use-page-init";

export default function Header() {
  const [collapsed] = useBoundStore((state) => [
    state.collapsed,
  ])!;
  // const { SignInModal, setShowSignInModal } = useSignInModal();
  const { data } = usePageInit()
  return (
    <>
      {/* <SignInModal /> */}
      <Navbar isBordered={false} maxWidth="full">
        {
          data?.body.isOwner && collapsed && (
            <NavbarItem as="div">
              <Button
                variant="light"
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
                isIconOnly
              >
                <Icons.DoubleArrowLeftIcon
                  className={cn(
                    "transition-transform",
                    collapsed ? "transform rotate-180" : "transform rotate-0"
                  )}
                />
              </Button>
            </NavbarItem>
          )}
        {data?.body.isOwner && <NavbarContent justify="start">
          <NavbarItem>
            <Breadcrumbs />
          </NavbarItem>
        </NavbarContent>
        }
        <NavbarContent justify="end">
          {data?.body.isOwner && (
            <>
              <NavbarItem>
                <Share />
              </NavbarItem>

              <NavbarItem>

                <DropdownMenus />
              </NavbarItem>
            </>
          )
          }
          <NavbarItem className="mr-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>




      </Navbar>
    </>
  );
}
