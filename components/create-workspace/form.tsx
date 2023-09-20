"use client"
import { AddSpaceResponse } from "@/app/api/space/route";
import { fetcher } from "@/lib/utils";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Avatar, Button, Checkbox, CheckboxGroup, Radio, RadioGroup } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation"

const addSpace = (url: string, {arg}: {arg: {avatar: string, name: string}}) => {
  return fetcher<AddSpaceResponse>(url, {
    method: "POST",
    body: JSON.stringify(arg)
  })
}

export function WorkspaceForm() {
  const [avatarSrc, setAvatarSrc] = useState("https://api.dicebear.com/6.x/lorelei/svg?seed=Chester")
  const router = useRouter()
  const [name, setName] = useState("")
  const {trigger, isMutating} = useSWRMutation("/api/space", addSpace)

  const handleCreate = () => {
    if (isMutating) return
    if (!name) {
      toast.error("Please enter a name")
      return
    }
    trigger({avatar: avatarSrc, name}).catch(err => {
      toast.error(err.message)
    }).then(res => {
      if (res) {
        router.push(`/${res.head.pageId}`)
      }
      
    })
  }
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

          <RadioGroup
            label="Select your favorite avatar"
            value={avatarSrc}
            onValueChange={value => setAvatarSrc(value)}
            orientation="horizontal"
          >
            <Radio value="https://api.dicebear.com/6.x/lorelei/svg?seed=Chester">
              <Avatar src="https://api.dicebear.com/6.x/lorelei/svg?seed=Chester"></Avatar>
            </Radio>
            <Radio value="https://api.dicebear.com/6.x/lorelei/svg?seed=Luna">
              <Avatar src="https://api.dicebear.com/6.x/lorelei/svg?seed=Luna"></Avatar>
            </Radio>
            <Radio value="https://api.dicebear.com/6.x/lorelei/svg?seed=Sophie">
              <Avatar src="https://api.dicebear.com/6.x/lorelei/svg?seed=Sophie"></Avatar>
            </Radio>
            <Radio value="https://api.dicebear.com/6.x/lorelei/svg?seed=Cleo">
              <Avatar src="https://api.dicebear.com/6.x/lorelei/svg?seed=Cleo"></Avatar>
            </Radio>
          </RadioGroup>
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