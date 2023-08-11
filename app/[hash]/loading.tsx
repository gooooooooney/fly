import { CircularProgress } from "@nextui-org/progress";

export default function Loading() {
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center">
      <CircularProgress aria-label="Loading..." />
    </div>
  )
}