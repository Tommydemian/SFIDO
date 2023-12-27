import React, { useMemo, forwardRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

import { CustomIcon } from "./CustomIcon";
import { BORDER, COLORS, ICON_SIZE, SPACING } from "../../assets/theme";
// TODO: backdrop and Modal style

type Props = {
  children: React.ReactNode;
};

const CustomBottomSheet = forwardRef<BottomSheet, Props>(
  ({ children }, ref) => {
    const snapPoints = useMemo(() => ["30%", "50%"], []);

    return (
      <BottomSheet
        enablePanDownToClose={true}
        style={styles.bottomSheet}
        ref={ref}
        snapPoints={snapPoints}
        index={0}
      >
        <View style={styles.bottomSheetContentContainer}>
          <TouchableOpacity
            onPress={handleRefClose}
            style={styles.bottomSheetCloseButton}
          >
            <CustomIcon
              library="AntDesign"
              name="closecircleo"
              size={ICON_SIZE.default}
              color={COLORS.blackSecondaryText}
              onPress={handleRefClose}
            />
          </TouchableOpacity>
          {children}
        </View>
      </BottomSheet>
    );
  },
);

CustomBottomSheet.displayName = "CustomBottomSheet";

export { CustomBottomSheet };

const styles = StyleSheet.create({
  bottomSheetContent: {
    color: COLORS.blackSecondaryText,
    fontSize: 18,
  },
  bottomSheetContentContainer: {
    padding: SPACING.spacing20,
  },
  bottomSheetCloseButton: {
    alignSelf: "flex-end",
    margin: SPACING.spacing10,
  },
  bottomSheet: {
    borderTopLeftRadius: BORDER.border20,
    borderTopRightRadius: BORDER.border20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
