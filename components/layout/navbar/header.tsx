"use client";
import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { ThemeSwitch } from "./theme-switch";
// import useStore from "@/hooks/use-store";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { cn } from "@/lib/utils";
import { useStore } from "zustand";
import { Icons } from "@/components/icons";
import { Session } from "next-auth";
import { Breadcrumbs } from "./breadcrumbs";
import _ from "lodash";

export default function Header({ session }: { session: Session | null }) {
  const [collapsed, setCollapsed] = useStore(useBoundStore, (state) => [
    state.collapsed,
    state.setCollapsed,
  ])!;
  // const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      {/* <SignInModal /> */}
      <Navbar isBordered={false} maxWidth="full">
        {collapsed && (
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
        <NavbarContent justify="start">
          <NavbarItem>
            <Breadcrumbs />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="mr-2">
            <ThemeSwitch />
          </NavbarItem>
          {/* <NavbarItem className="mr-8">
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Button
              
                variant="light"
                onClick={() => {
                  setShowSignInModal(true);
                }}
              >
                sign in
              </Button>
            )}
          </NavbarItem> */}
        </NavbarContent>
      </Navbar>
    </>
  );
}
