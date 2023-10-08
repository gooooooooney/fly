import { StateCreator } from "zustand"
import { saveProperty } from "@/lib/data-source/page"
import { findMenu } from "@/lib/menus";
import { useBoundStore } from "./useBoundStore";






export interface UserSlice {
  avatar: string;
  name: string
}
export const createUserSlice: StateCreator<
  UserSlice,
  [],
  [],
  UserSlice
> = (set) => {
  return ({
    avatar: "",
    name: ""
  })
}

export const setAvatar = (avatar: string = "") => useBoundStore.setState(s => {
  s.avatar = avatar
})

export const setName = (name: string = "") => useBoundStore.setState(s => {
  s.name = name
})