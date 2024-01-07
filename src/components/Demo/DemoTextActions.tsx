import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "../SubmitButton";
import { NunitoText } from "../Fonts/NunitoText";
import { FontPicker } from "./FontPicker";
import { COLORS, ICON_SIZE, SPACING } from "../../../assets/theme";
import { CustomIcon } from "../CustomIcon";
import { useDemoMessageContext } from "../../contexts/DemoMessageContext";
import { DemoNeedInspiration } from "./DemoNeedInspiration";

type Props = {
  handleWriteMyOwn: () => void;
  isFontPickerOpen: boolean;
  handleFontPickerOpen: () => void;
};

export const DemoTextActions: React.FC<Props> = ({
  handleFontPickerOpen,
  handleWriteMyOwn,
  isFontPickerOpen,
}) => {
  const { fontSelected, setFontSelected } = useDemoMessageContext();

  const fonts = [
    "NunitoRegular",
    "RobotoRegular",
    "MerriweatherRegular",
    "BebasNeueRegular",
    "YungJakesTextRegular",
  ];

  const [fontIndex, setFontIndex] = useState(0);

  const fontIndexIncrease = () => {
    setFontIndex((prev) => prev + 1);
  };

  useEffect(() => {
    setFontSelected(fonts[fontIndex]);
  }, [fontIndex]);

  useEffect(() => {
    console.log(fontSelected);
  }, [fontSelected]);

  return (
    <View style={styles.actionsContainer}>
      <View style={styles.iconsContainer}>
        <View style={styles.iconWrapper}>
          <CustomIcon
            library="Ionicons"
            name="color-palette"
            size={ICON_SIZE.default}
            color={COLORS.whiteText}
            // onBottomSheetPress={onPress}
          />
        </View>
        <View style={styles.iconWrapper}>
          <CustomIcon
            library="FontAwesome"
            name="font"
            size={ICON_SIZE.small}
            color={COLORS.whiteText}
            onPress={fontIndexIncrease}
          />
        </View>
      </View>
      <DemoNeedInspiration />
      {/* <SubmitButton 
        customStyles={styles.writeOwnMssgButton}
        onPress={handleWriteMyOwn}
        >
        <NunitoText customStyles={styles.writeOwnMssgButtonText} type="bold">
        Write My Message
        </NunitoText>
        </SubmitButton>
        {isFontPickerOpen && (
          <FontPicker handleFontPickerOpen={handleFontPickerOpen} />
        )}  */}
    </View>
  );
};

export default DemoTextActions;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.spacing20,
  },
  iconsContainer: {
    flexDirection: "row",
    columnGap: SPACING.spacing10,
  },
  writeOwnMssgButton: {
    backgroundColor: COLORS.ghostWhite,
    width: "60%",
  },
  writeOwnMssgButtonText: {
    // color: "#363636",
    color: COLORS.blackSecondaryText,
    textAlign: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.folly,
    height: 34,
    width: 34,
    borderRadius: 100,
  },
});
