
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar, User } from "@nextui-org/react";
import { Icons } from "@/components/icons";

export default function SidebarHeader() {
  return (
    <div className="flex items-center px-5 my-9">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <section className="flex transition-transform items-center cursor-pointer">
            <User
              as="button"
              avatarProps={{
                isBordered: false,
                src: "https://images.unsplash.com/photo-1546881963-ac8d67aee789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyJTIwbW91bnRhaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
              }}
              className="transition-transform"
              name="gooney的空间"
            />
            <Icons.ChevronsUpDownIcon className="ml-3" size={18} />
          </section>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
