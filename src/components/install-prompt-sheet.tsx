import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ExportCurve, Mobile } from "iconsax-react";
import { Button } from "./ui/button";

const SHOW_DELAY_MS = 1200;

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

// The welcome screen's own guide to installing the PWA, shown every time a
// signed-out visitor lands here (no persisted "seen it" flag by design —
// dismissing only hides it for this visit, not future ones). Chrome/Edge on
// Android support a native install prompt (captured below); iOS Safari has
// no such API, so it gets manual Share-sheet steps instead.
export function InstallPromptSheet() {
  const [open, setOpen] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  useEffect(() => {
    if (isStandalone()) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const install = async () => {
    if (installEvent) await installEvent.prompt();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} disablePointerDismissal>
      <Dialog.Portal>
        <Dialog.Backdrop className="sheet-backdrop" />
        <Dialog.Viewport className="sheet-viewport">
          <Dialog.Popup className="date-sheet install-sheet">
            <span className="sheet-handle" />
            <div className="sheet-title">
              <span><Mobile color="currentColor" size="22" /></span>
              <div>
                <Dialog.Title className="!font-bold">Add Wellstaq to your Home Screen</Dialog.Title>
                <Dialog.Description>Install the Wellstaq app on your device.</Dialog.Description>
              </div>
            </div>
            {installEvent ? (
              <Button className="w-full" onClick={() => void install()}>Install app</Button>
            ) : isIOS ? (
              <ol className="install-steps">
                <li><span>1</span> Tap the Share icon <ExportCurve color="currentColor" size="16" /> in Safari's toolbar</li>
                <li><span>2</span> Scroll down and tap "Add to Home Screen"</li>
                <li><span>3</span> Tap "Add" to confirm</li>
              </ol>
            ) : (
              <ol className="install-steps">
                <li><span>1</span> Open your browser's menu</li>
                <li><span>2</span> Tap "Add to Home screen" or "Install app"</li>
              </ol>
            )}
            <Dialog.Close render={<Button className="w-full opacity-20" variant="ghost" />}>maybe later</Dialog.Close>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
