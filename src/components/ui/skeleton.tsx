import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md dark:bg-gray-600 bg-[#DCDCDC]", className)}
      {...props}
    />
  )
}

export { Skeleton }

