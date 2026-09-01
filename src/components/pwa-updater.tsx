import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";
import { useEffect } from "react";

export function PwaUpdater() {
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW({
    onOfflineReady: () => toast.success("Wellstaq is ready to open offline."),
  });
  useEffect(() => {
    if (needRefresh) {
      toast("A new Wellstaq version is ready.", { action: { label: "Update", onClick: () => void updateServiceWorker(true) } });
    }
  }, [needRefresh, updateServiceWorker]);
  return null;
}
