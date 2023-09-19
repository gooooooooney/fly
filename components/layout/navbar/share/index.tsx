import { usePageInit } from "@/hooks/use-page-init";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const enum Permission {
  READ = "READ",
  EDIT = "EDIT"
}

export function Share() {
  const { data } = usePageInit()
  const [value, setValue] = useState(new Set([]))
  if (!data) return

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="shadow">Share</Button>
      </PopoverTrigger>
      <PopoverContent>
        {
          !!data.body?.sharePage?.enabled ? (
            <div>
              <Button fullWidth>
                Share page
              </Button>
            </div>
          ) : (
            <div>
              <Select
                placeholder="Select permission"
                selectedKeys={value}
                onSelectionChange={(keys: any) => {
                  const permission = keys[0]
                  setValue(keys)
                }}
                defaultSelectedKeys={[data.body!.sharePage!.permission!]}>
                <SelectItem key={Permission.READ} value={Permission.READ}>
                  Read
                </SelectItem>
                <SelectItem key={Permission.EDIT} value={Permission.EDIT}>
                  Read
                </SelectItem>
              </Select>
            </div>
          )
        }
      </PopoverContent>
    </Popover>
  )
}