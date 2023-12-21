import { StyleSheet, View } from "react-native";
import React from "react";

import { CustomIcon } from "../CustomIcon";
import { NunitoText } from "../Fonts/NunitoText";
import { COLORS, SPACING } from "../../../assets/theme";

type Props = {
  onPress: () => void;
};

export const DemoNeedInspiration: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.needInspTextContainer}>
      <NunitoText type="bold" customStyles={styles.needInspText}>
        Need some inspiration?
      </NunitoText>
      <CustomIcon
        library="AntDesign"
        name="infocirlce"
        size={24}
        color={COLORS.black}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  needInspText: {
    color: COLORS.blackSecondaryText,
  },
  needInspTextContainer: {
    flexDirection: "row",
    margin: SPACING.spacing10,
    columnGap: SPACING.spacing10,
  },
});
