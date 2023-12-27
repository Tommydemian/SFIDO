import React, { useMemo, forwardRef, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

import { CustomIcon } from "./CustomIcon";
import { COLORS, ICON_SIZE, SPACING, BORDER } from "../../assets/theme";
// TODO: backdrop and Modal style

type Props = {
  children: React.ReactNode;
  renderIcon: (handleOpenPress: () => void) => React.ReactNode;
  setIsBottomSheetVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CustomVideoBottomSheet: React.FC<Props> = ({
  children,
  renderIcon,
  setIsBottomSheetVisible,
}) => {
  const snapPoints = useMemo(() => ["40%", "50%", "70%"], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    setIsBottomSheetVisible(false);
  };

  const handleOpenPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
    setIsBottomSheetVisible(true);
  };

  return (
    <>
      {renderIcon(handleOpenPress)}
      <BottomSheet
        enablePanDownToClose={true}
        style={styles.bottomSheet}
        backgroundStyle={{ backgroundColor: COLORS.semiTransparent }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
      >
        <View style={styles.contentContainer}>
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
          {children}
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: BORDER.border20,
    borderTopRightRadius: BORDER.border20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: "#FFF",
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
