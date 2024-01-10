import { useState } from "react";

export const useBottomSheet = (initialVisibility = false) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] =
    useState(initialVisibility);

  const handleOpen = () => setIsBottomSheetVisible(true);
  const handleClose = () => setIsBottomSheetVisible(false);

  return {
    isBottomSheetVisible,
    handleOpen,
    handleClose,
    setIsBottomSheetVisible,
  };
};
