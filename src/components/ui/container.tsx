import { cn } from "@/lib/cn";

/** Lebar konten maksimum + gutter responsif, konsisten di semua section. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1366px] px-5 sm:px-8 lg:px-16", className)} {...props} />;
}
