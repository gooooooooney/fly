"use client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from "@nextui-org/react";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons"
import { ThemeSwitch } from "./theme-switch";
// import useStore from "@/hooks/use-store";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { cn } from "@/lib/utils";
import { useStore } from "zustand";

export default function Header() {
  const [collapsed, setCollapsed] = useStore(useBoundStore, (state) => [state.collapsed, state.setCollapsed])!

  return (
    <Navbar isBordered={false} maxWidth="2xl">
      <NavbarContent justify="start">
        <NavbarItem >
          <Button
            variant="light"
            onClick={() => {
              setCollapsed(!collapsed)
            }}
            isIconOnly>
            <DoubleArrowLeftIcon className={cn(
              "transition-transform",
              collapsed ? "transform rotate-180" : "transform rotate-0"
            )} />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}