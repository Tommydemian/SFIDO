import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CustomIcon } from "../CustomIcon";
import { NunitoText } from "../Fonts/NunitoText";
import {
  BORDER,
  COLORS,
  FONT_SIZE,
  ICON_SIZE,
  SPACING,
} from "../../../assets/theme";
import { useToggle } from "../../hooks/useToggle";

type Props = {
  section: "Demo" | "Post";
};

export const CraftMessageNeedInspiration: React.FC<Props> = ({ section }) => {
  const [isTooltipOpened, toggle] = useToggle();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <NunitoText type="bold" customStyles={styles.needInspText}>
          Need inspiration?
        </NunitoText>
        <CustomIcon
          library="AntDesign"
          name="infocirlce"
          size={24}
          color={COLORS.white}
          onPress={
            section === "Demo"
              ? toggle
              : () => navigation.navigate("InspirationScreen")
          }
        />

        {isTooltipOpened && section === "Demo" && (
          <View style={styles.tooltip}>
            <CustomIcon
              library="Entypo"
              name="circle-with-cross"
              size={ICON_SIZE.small}
              color={COLORS.cerulean}
              customStyles={styles.tooltipCross}
              onPress={toggle}
            />
            <NunitoText type="bold" customStyles={styles.tooltipText}>
              In the app, you'll discover quotes aligned with your interests.
              For now, just write anything to see how it looks. 🤗
            </NunitoText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  needInspText: {
    color: COLORS.ghostWhite,
    textDecorationLine: "underline",
    textTransform: "capitalize",
    fontSize: FONT_SIZE.default,
  },
  container: {
    flexDirection: "row",
    marginBottom: SPACING.spacing20,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    columnGap: SPACING.spacing5,
    position: "relative",
  },
  tooltip: {
    position: "absolute",
    top: 0,
    borderRadius: BORDER.border10,
    left: 0,
    width: "100%",
    padding: SPACING.spacing10,
    backgroundColor: COLORS.semiTransparentLight,
  },
  tooltipText: {
    color: COLORS.cerulean,
    fontSize: FONT_SIZE.tooltip,
  },
  tooltipCross: {
    position: "absolute",
    right: 0,
    padding: SPACING.spacing5,
    zIndex: 5,
  },
});
