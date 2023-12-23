import { useState, useCallback } from 'react';

export const useDialogVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showDialog = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideDialog = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    setIsVisible,
    showDialog,
    hideDialog,
  };
};
