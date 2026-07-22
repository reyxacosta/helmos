import { cn } from "@/lib/cn";

export function FormBanner({
  variant = "error",
  message,
}: {
  variant?: "error" | "success";
  message?: string;
}) {
  if (!message) return null;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        variant === "error"
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-primary/30 bg-primary/10 text-foreground"
      )}
    >
      {message}
    </div>
  );
}
