import React, {
  useMemo,
  forwardRef,
  useEffect,
  RefObject,
  useCallback,
} from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

import { CustomIcon } from "./CustomIcon";
import { COLORS, ICON_SIZE, SPACING, BORDER } from "../../assets/theme";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
// TODO: backdrop and Modal style

type Props = {
  children: React.ReactNode;
  isBottomSheetVisible?: boolean;
  setIsBottomSheetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  snapPoint?: string;
  closeIconPresent: boolean;
};

export const CustomBottomSheet = forwardRef<BottomSheetMethods, Props>(
  (
    {
      children,
      setIsBottomSheetVisible,
      isBottomSheetVisible,
      closeIconPresent,
      snapPoint = "40%",
    },
    ref,
  ) => {
    const snapPoints = useMemo(() => [snapPoint, "50%", "70%"], []);

    const handleClosePress = () => {
      ref?.current?.close();
      setIsBottomSheetVisible(false);
    };

    // const handleOpenPress = () => {
    //   ref?.current?.snapToIndex(0);
    //   setIsBottomSheetVisible(true);
    // };

    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          setIsBottomSheetVisible(false);
        }
      },
      [setIsBottomSheetVisible],
    );

    return (
      <>
        {isBottomSheetVisible && (
          <BottomSheet
            enablePanDownToClose={true}
            onChange={handleSheetChanges}
            style={styles.bottomSheet}
            backgroundStyle={{ backgroundColor: COLORS.dimGrey }}
            ref={ref}
            snapPoints={snapPoints}
            index={0}
          >
            <View style={styles.contentContainer}>
              {closeIconPresent && (
                <TouchableOpacity onPress={handleClosePress}>
                  <CustomIcon
                    library="AntDesign"
                    name="closecircle"
                    size={ICON_SIZE.default}
                    color={COLORS.black}
                    onPress={handleClosePress}
                    customStyles={styles.closeIcon}
                  />
                </TouchableOpacity>
              )}
              {children}
            </View>
          </BottomSheet>
        )}
      </>
    );
  },
);

CustomBottomSheet.displayName = "CustomBottomSheet";

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: BORDER.border20,
    borderTopRightRadius: BORDER.border20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.spacing10,
  },
  closeIcon: {
    alignSelf: "flex-end",
    paddingBottom: SPACING.spacing15,
  },
});
