import { Children, cloneElement, forwardRef, isValidElement, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full rounded-2xl border border-line bg-white px-4 text-[15px] text-ink outline-offset-1 placeholder:text-muted/70 focus:border-brand focus:outline focus:outline-2 focus:outline-brand/25",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export function Field({
  label,
  error,
  hint,
  children,
}: {
  label: ReactNode;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  const id = useId();
  const labelControls = (nodes: ReactNode): ReactNode => Children.map(nodes, (node) => {
    if (!isValidElement<{ children?: ReactNode; 'aria-labelledby'?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean }>(node)) return node;
    if (node.type === Input || node.type === 'input' || node.type === 'select' || node.type === 'textarea') {
      return cloneElement(node, { 'aria-labelledby': `${id}-label`, 'aria-describedby': error || hint ? `${id}-help` : undefined, 'aria-invalid': Boolean(error) });
    }
    return node.props.children ? cloneElement(node, { children: labelControls(node.props.children) }) : node;
  });
  return (
    <div className="grid gap-2 text-sm font-medium text-ink">
      <span id={`${id}-label`}>{label}</span>
      {labelControls(children)}
      {(error || hint) && <span id={`${id}-help`} className={cn("text-xs font-normal", error ? "text-danger" : "text-muted")}>{error ?? hint}</span>}
    </div>
  );
}
