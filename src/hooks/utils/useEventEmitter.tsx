import useLatestRef from "./useLatestRef";
import { useCallback, useEffect } from "react";
import eventEmitter from "@/services/event.emitter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEventEmitter = (eventName: string, callback: (...args: any[]) => void) => {
  const callbackRef = useLatestRef(callback);

  /// Latest event firing function
  const handleEvent = useCallback((...data: unknown[]) => {
    callbackRef.current(...data);
  }, [callbackRef]);

  /// Listen to the event
  useEffect(() => {
    if (eventName?.trim()) {
      eventEmitter.on(eventName, handleEvent);
    }

    /// Remove the listener after unmounting
    return () => {
      eventEmitter.off(eventName, handleEvent);
    };
  }, [eventName, handleEvent]);
};

export default useEventEmitter;
