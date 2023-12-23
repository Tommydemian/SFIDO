import { useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

type ActiveBottomSheet = {
  activeOne: "colorPicker" | "inspiration";
};

export const useBottomSheet = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [activeBottomSheet, setActiveBottomSheet] =
    useState<ActiveBottomSheet | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBottomSheetOpen = (type: ActiveBottomSheet) => {
    setActiveBottomSheet(type);
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetVisible(false);
    setActiveBottomSheet(null);
  };

  return {
    isBottomSheetVisible,
    handleBottomSheetClose,
    handleBottomSheetOpen,
    bottomSheetRef,
    activeBottomSheet,
    setActiveBottomSheet,
  };
};
