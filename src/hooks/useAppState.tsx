import { useEffect, useState } from "react";
import { AppState } from "react-native";

export const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    });

    return () => {π
      subscription.remove();
    };
  }, []);

  return { appState, setAppState };
};
