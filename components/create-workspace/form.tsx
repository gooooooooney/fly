"use client"
import { addSpace } from "@/lib/data-source/space";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";



export function WorkspaceForm() {
  const [avatarSrc, setAvatarSrc] = useState<string>("https://api.dicebear.com/6.x/lorelei/svg?seed=Chester")
  const router = useRouter()
  const [name, setName] = useState("")
  const { trigger, isMutating } = useSWRMutation("/api/space", addSpace)

  const handleCreate = () => {
    if (isMutating) return
    if (!name) {
      toast.error("Please enter a name")
      return
    }
    trigger({ avatar: avatarSrc, name }).catch(err => {
      toast.error(err.message)
    }).then(res => {
      if (res) {
        router.push(`/${res.head.pageId}`)
      }

    })
  }
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAvatarSrc(e.target.value);
  };
  return (
    <Card
      className="max-w-[400px] mx-auto">
      <CardHeader className="">New space</CardHeader>
      <CardBody>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleCreate()}
          autoFocus
          label="Name"
          placeholder="Enter your space name"
          variant="bordered"
        />
        <section className="my-4">

          <Avatar
            src={avatarSrc}
          ></Avatar>
          <Select
            label="Select your avatar"
            selectedKeys={[avatarSrc]}
            onChange={handleSelectionChange}          >
            <SelectItem key="https://api.dicebear.com/7.x/lorelei/svg?seed=Chester&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid" value="https://api.dicebear.com/7.x/lorelei/svg?seed=Chester&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid">
              <Avatar
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Chester&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid"
              ></Avatar>
              luona
            </SelectItem>
            <SelectItem key="https://api.dicebear.com/7.x/lorelei/svg?seed=Luna&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid" value="https://api.dicebear.com/7.x/lorelei/svg?seed=Luna&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid">
              <Avatar
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Luna&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid"
              ></Avatar>
ff
            </SelectItem>
            <SelectItem key="https://api.dicebear.com/7.x/lorelei/svg?seed=Sophie&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid" value="https://api.dicebear.com/7.x/lorelei/svg?seed=Sophie&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid">
              <Avatar
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Sophie&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid" />
bb
            </SelectItem>
            <SelectItem key="https://api.dicebear.com/7.x/lorelei/svg?seed=Cleo&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid" value="https://api.dicebear.com/7.x/lorelei/svg?seed=Cleo&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid">
              <Avatar
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Cleo&rotate=0&scale=100&hair=variant01&translateX=0&radius=0&backgroundType=solid"
              ></Avatar>
cc
            </SelectItem>
          </Select>

        </section>
      </CardBody>
      <CardFooter>
        <Button
          onClick={handleCreate}
          isLoading={isMutating}
          disabled={isMutating}
          color="primary"
          variant="ghost"
          fullWidth>
          Create
        </Button>
      </CardFooter>
    </Card>
  )
}