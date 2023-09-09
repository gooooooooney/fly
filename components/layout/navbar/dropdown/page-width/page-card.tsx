import { cn } from "@/lib/utils";
import { Card } from "@nextui-org/react";
import { ReactNode } from "react";

export const PageCard = ({px, title}: {px?: string, title: ReactNode}) => (
    <Card className={cn("space-y-2 w-20 p-2 text-center text-xs", px)} radius="sm">
      <div className="h-5 rounded-sm bg-default-300"></div>
      <div className="space-y-1">
        <div className="h-1 w-3/5 rounded-lg bg-default-200"></div>
        <div className="h-1 w-4/5 rounded-lg bg-default-200"></div>
        <div className="h-1 w-2/5 rounded-lg bg-default-300"></div>
      </div>
      {title}
    </Card>
  );
  