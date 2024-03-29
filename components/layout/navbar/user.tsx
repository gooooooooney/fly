"use client";


import { useClerk } from "@clerk/nextjs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  User,
  DropdownSection,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function UserDropdown({ session }: any) {
  const {signOut} = useClerk()
  const { email, image, name } = session?.user || {};
  const router = useRouter();

  if (!email) return null;
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownSection showDivider>
          <DropdownItem
            key="profile"
            textValue="profile"
            className="h-14 gap-2"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{name}</p>
          </DropdownItem>
          <DropdownItem key="email" textValue="email">
            <p className="font-semibold">{email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            textValue="logout"
            key="logout"
            onClick={() => {
              signOut();
            }}
            color="danger"
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
