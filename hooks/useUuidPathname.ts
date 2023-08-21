import { usePathname } from "next/navigation";

export function useUuidPathname() {
    const pathname = usePathname();
    const pattern = /\/([a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12})/;
    const match = pathname.match(pattern);
    return match ? match[1] : "";
}