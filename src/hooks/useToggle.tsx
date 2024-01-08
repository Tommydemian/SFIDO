import { useState, useCallback } from "react";

export const useToggle = (iniitalVal = false): [boolean, () => void] => {
  const [state, setState] = useState(iniitalVal);

  const handleToggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, handleToggle];
};
