
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
import { useClerk } from "@clerk/nextjs";

interface SidebarHeaderProps {
  name: string;
  avatar: string;
  email: string;
}

export default function SidebarHeader(props: SidebarHeaderProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { signOut } = useClerk();

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
                window.location.reload();
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
            <DropdownItem textValue="profile" key="profile" className="h-14 gap-2">
              {/* <p className="font-bold">Signed in as</p> */}
              <p className="font-bold">{props.email}</p>
            </DropdownItem>
            {/* <DropdownItem textValue="settings" key="settings">My Settings</DropdownItem> */}
            <DropdownItem textValue="avatar" key="avatar">Change avatar</DropdownItem>
            {/* <DropdownItem textValue="analytics" key="analytics">Analytics</DropdownItem>
            <DropdownItem textValue="system" key="system">System</DropdownItem>
            <DropdownItem textValue="configurations" key="configurations">Configurations</DropdownItem>
            <DropdownItem textValue="help_and_feedback" key="help_and_feedback">Help & Feedback</DropdownItem> */}
          </DropdownSection>
          <DropdownSection>
            <DropdownItem textValue="logout" key="logout" color="danger">
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
            <Dicebear onCancel={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
