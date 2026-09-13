import type { ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { CloseCircle } from "iconsax-react";

// A centered modal dialog (as opposed to the app's bottom sheets) for
// creation flows like "Create club" / "Create challenge": title + subtitle
// with a close button, a scrollable body, and a footer pinned below it.
export function Modal({ open, onOpenChange, title, description, footer, children }: { open: boolean; onOpenChange(open: boolean): void; title: string; description?: string; footer: ReactNode; children: ReactNode }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="sheet-backdrop" />
        <Dialog.Viewport className="modal-viewport">
          <Dialog.Popup className="modal-panel" aria-label={title}>
            <div className="modal-head">
              <div><Dialog.Title>{title}</Dialog.Title>{description && <Dialog.Description>{description}</Dialog.Description>}</div>
              <Dialog.Close aria-label="Close" className="modal-close"><CloseCircle size="22" color="currentColor" /></Dialog.Close>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-actions">{footer}</div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
