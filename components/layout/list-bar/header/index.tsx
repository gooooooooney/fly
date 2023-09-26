import { signOut } from "next-auth/react";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  User,
  DropdownSection,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";
import { Icons } from "@/components/icons";
import { Dicebear } from "@/components/dicebear";

interface SidebarHeaderProps {
  name: string;
  avatar: string;
  email: string;
}

export default function SidebarHeader(props: SidebarHeaderProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex items-center px-5 ">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <section className="flex transition-transform items-center cursor-pointer">
            <User
              as="button"
              avatarProps={{
                isBordered: false,
                src:
                  props.avatar ||
                  "https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyJTIwbW91bnRhaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
              }}
              className="transition-transform"
              name={props.name || "Unknown's space"}
            />
            <Icons.ChevronsUpDownIcon className="ml-3" size={18} />
          </section>
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={["profile"]}
          onAction={(key) => {
            switch (key) {
              case "logout": {
                signOut();
                break;
              }
              case "avatar": {
                onOpen();
                break;
              }
              default:
                break;
            }
          }}
          aria-label="User Actions"
          variant="flat"
        >
          <DropdownSection showDivider>
            <DropdownItem key="profile" className="h-14 gap-2">
              {/* <p className="font-bold">Signed in as</p> */}
              <p className="font-bold">{props.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="avatar">avatar</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen}
        scrollBehavior="inside"
        classNames={{
          base: "max-w-[50vw] p-10",
        }} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          <ModalHeader> Select avatar </ModalHeader>
          <ModalBody>
            <Dicebear />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
