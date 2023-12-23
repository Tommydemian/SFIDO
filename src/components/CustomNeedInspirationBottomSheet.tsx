import React, { useMemo, forwardRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

import { CustomIcon } from "./CustomIcon";
import { NunitoText } from "./Fonts/NunitoText";
import { COLORS, ICON_SIZE, SPACING } from "../../assets/theme";
import { ActiveBottomSheet } from "../types";
// TODO: backdrop and Modal style

type Props = {
  onPress: (type: ActiveBottomSheet) => void;
};

const CustomNeedInspirationBottomSheet = forwardRef<BottomSheet, Props>(
  ({ onPress }, ref) => {
    const snapPoints = useMemo(() => ["30%", "50%"], []);

    return (
      <BottomSheet
        enablePanDownToClose={true}
        ref={ref}
        snapPoints={snapPoints}
      >
        <View style={styles.bottomSheetContentContainer}>
          <TouchableOpacity
            style={styles.bottomSheetCloseButton}
            onPress={onPress}
          >
            <CustomIcon
              library="AntDesign"
              name="closecircleo"
              size={ICON_SIZE.default}
              color={COLORS.blackSecondaryText}
            />
          </TouchableOpacity>
          <NunitoText customStyles={styles.bottomSheetContent}>
            If you're feeling a bit lost or just unsure what to write, visit our
            [Inspiration Section] to find famous quotes that might motivate you.
          </NunitoText>
        </View>
      </BottomSheet>
    );
  },
);

CustomNeedInspirationBottomSheet.displayName =
  "CustomNeedInspirationBottomSheet";

export { CustomNeedInspirationBottomSheet };

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
});
