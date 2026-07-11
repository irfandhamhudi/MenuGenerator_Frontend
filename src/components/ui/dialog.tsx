import { cn } from "../../lib/utils";
import { forwardRef, type HTMLAttributes, useEffect } from "react";

const Dialog = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-full max-w-sm mx-4">
        {children}
      </div>
    </div>
  );
};

const DialogContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-xl border bg-card text-card-foreground shadow-lg p-6",
        className,
      )}
      {...props}
    />
  ),
);
DialogContent.displayName = "DialogContent";

const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />
  ),
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
DialogTitle.displayName = "DialogTitle";

export { Dialog, DialogContent, DialogHeader, DialogTitle };
