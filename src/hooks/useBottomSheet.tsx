import { useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Keyboard } from "react-native";

type ActiveBottomSheet = {
  activeOne: "colorPicker" | "inspiration" | "videoPLayer";
};

export const useBottomSheet = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [activeBottomSheet, setActiveBottomSheet] =
    useState<ActiveBottomSheet | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleRefClose = () => {
    bottomSheetRef?.current?.close();
  };

  const handleBottomSheetOpen = (type: ActiveBottomSheet) => {
    setActiveBottomSheet(type);
    setIsBottomSheetVisible(true);
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetVisible(false);
    setActiveBottomSheet(null);
    console.log("press enter");
    console.log(isBottomSheetVisible);
  };

  useEffect(() => {
    console.log(isBottomSheetVisible, activeBottomSheet);
  }, [isBottomSheetVisible, activeBottomSheet]);

  return {
    isBottomSheetVisible,
    handleBottomSheetClose,
    handleBottomSheetOpen,
    bottomSheetRef,
    activeBottomSheet,
    setActiveBottomSheet,
    setIsBottomSheetVisible,
    handleRefClose,
  };
};
