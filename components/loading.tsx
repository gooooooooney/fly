import { CircularProgress } from "@nextui-org/progress";

export default function Circular() {
  return (
    <div className="flex w-screen h-[100dvh] fixed inset-0 z-50 overflow-x-auto justify-center [--scale-enter:100%] [--scale-exit:100%] [--slide-enter:0px] [--slide-exit:80px] sm:[--scale-enter:100%] sm:[--scale-exit:103%] sm:[--slide-enter:0px] sm:[--slide-exit:0px] items-end sm:items-center">
      <CircularProgress aria-label="Loading..." />
    </div>
  )
}   