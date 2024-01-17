import { StyleSheet, View } from "react-native";
import React from "react";
import { CustomIcon } from "../CustomIcon";
import { COLORS, ICON_SIZE, SPACING } from "../../../assets/theme";
import { DemoScreenTitle } from "./DemoScreenTitle";
import { CollageSvg } from "../CollageSvg";
import { DemoMediaNavigationProps } from "../../screens/DemoCreateMessageMediaScreen";
import { HandWithPenSvg } from "../HandWithPenSvg";
import { DemoTextNavigationProps } from "../../screens/DemoCreateMessageTextScreen";
import { PostTextNavigationProps } from "../../screens/PostMessageTextScreen";
import { PostMediaNavigationProps } from "../../screens/PostMessageMediaScreen";

type Props = {
  navigation:
    | DemoMediaNavigationProps["navigation"]
    | DemoTextNavigationProps["navigation"]
    | PostTextNavigationProps["navigation"]
    | PostMediaNavigationProps["navigation"];
  title: string;
  type: "text" | "media";
};

export const CraftMessageHeader: React.FC<Props> = ({
  navigation,
  title,
  type,
}) => {
  return (
    <View style={styles.headerContainer}>
      <CustomIcon
        library="Ionicons"
        name="chevron-back"
        size={ICON_SIZE.goBack}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
        customStyles={type === "text" ? styles.goBackText : styles.goBackMedia}
      />
      <DemoScreenTitle title={title}>
        {type == "text" ? <HandWithPenSvg /> : <CollageSvg />}
      </DemoScreenTitle>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  goBackText: {
    position: "absolute",
    left: 0,
  },
  goBackMedia: {
    position: "absolute",
    left: SPACING.spacing40,
  },
});
