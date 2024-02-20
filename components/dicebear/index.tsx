import { Input, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { Lorelei } from "./lorelei";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { usePageInit } from "@/hooks/use-page-init";
import { getImgSrcParams } from "@/lib/utils";
interface DicebearProps {
  onCancel: () => void;
}
export function Dicebear(props: DicebearProps) {
  const [avatar] = useBoundStore( (state) => [
    state.avatar,
  ])!;
  return (
    <section>
      < Lorelei {...getImgSrcParams(avatar)} onCancel={props.onCancel}   />
    </section>
  )
}