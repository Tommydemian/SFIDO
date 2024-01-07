import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";

import { CustomIcon } from "../CustomIcon";
import { NunitoText } from "../Fonts/NunitoText";
import { COLORS, SPACING } from "../../../assets/theme";
import Tooltip from "rn-tooltip";

export const DemoNeedInspiration = () => {
  const [isPressed, setIsPressed] = React.useState(false);

  useEffect(() => {
    console.log(isPressed);
  }, [isPressed]);

  return (
    <View style={styles.container}>
      <Tooltip
        popover={
          <NunitoText type="semiBold">
            This is just a demo section. In the app, you'll find many quotes
            tailored to your interests. For now, feel free to write anything to
            see how it works.🤗
          </NunitoText>
        }
        overlayColor="transparent"
        backgroundColor={COLORS.blackBg}
        width={300}
        height={125}
        containerStyle={{ padding: SPACING.spacing10 }}
        highlightColor={COLORS.blackBg}
      >
        <View style={styles.contentContainer}>
          <NunitoText
            type="bold"
            customStyles={isPressed ? styles.pressedText : styles.needInspText}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            Need some inspiration?
          </NunitoText>
          {/* <CustomIcon
            library="AntDesign"
            name="infocirlce"
            size={24}
            color={COLORS.black}
          /> */}
        </View>
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  needInspText: {
    color: COLORS.ghostWhite,
    textDecorationLine: "underline", // Añade subrayado
    textTransform: "capitalize",
    fontSize: 14,
  },
  container: {
    flexDirection: "row",
    marginBottom: SPACING.spacing20,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: SPACING.spacing5,
  },
});
