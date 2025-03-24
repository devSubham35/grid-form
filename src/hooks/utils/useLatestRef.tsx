import { useEffect, useRef } from "react";

const useLatestRef = <T,>(value: T) => {
  const valueRef = useRef<T>(value);

  /// Whenever the value change it update the value
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
};

export default useLatestRef;
