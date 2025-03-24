import { toast } from "sonner";
import { useCallback } from "react";
import events from "@/json/events/events";
import useEventEmitter from "@/hooks/utils/useEventEmitter";

export default function EventListeners() {

  const showNotifications = useCallback(
    (data: { message: string; variant: string }) => {

      if (data?.variant === "error") {
        toast.error(data?.message);
      }

      if (data?.variant === "success") {
        toast.success(data?.message);
      }

      if (data?.variant === "warning") {
        toast.error(data?.message);
      }
    },
    []
  );

  useEventEmitter(events.showNotification, showNotifications);

  return null;
}
