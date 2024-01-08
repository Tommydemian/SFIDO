import React from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { OnBoardingData } from "../../../assets/constants/data";
import { NunitoText } from "../Fonts/NunitoText";
import { BORDER, COLORS, FONT_SIZE, SPACING } from "../../../assets/theme";
import { SharedValue } from "react-native-reanimated";

type RenderItemProps = {
  item: OnBoardingData;
  index: number;
  x?: SharedValue<number>;
};

export const OnBoardingRenderItem: React.FC<RenderItemProps> = ({
  item,
  index,
  x,
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  return (
    <View
      style={[
        styles.itemContainer,
        { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
      ]}
    >
      <StatusBar barStyle={"default"} />
      <View style={StyleSheet.absoluteFill}>
        <Image
          style={[
            styles.itemImage,
            { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.7 },
          ]}
          source={item.image}
        />
      </View>
      <View
        style={[
          styles.itemContent,
          { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.4 },
        ]}
      >
        <View style={styles.itemTextContainer}>
          <NunitoText type="bold" customStyles={styles.itemTitle}>
            {item.title}
          </NunitoText>
          <NunitoText customStyles={styles.itemText}>{item.text}</NunitoText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
  },
  itemImage: {
    resizeMode: "cover",
  },
  itemContent: {
    alignItems: "center",
    paddingHorizontal: SPACING.spacing20,
    backgroundColor: COLORS.blueNCS,
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: BORDER.border20,
    borderTopLeftRadius: BORDER.border20,
  },
  itemTextContainer: {
    marginTop: SPACING.spacing15,
  },
  itemTitle: {
    color: COLORS.whiteText,
    fontSize: FONT_SIZE.onBoardingTitle,
    textAlign: "center",
    marginBottom: SPACING.spacing15,
  },
  itemText: {
    color: COLORS.whiteText,
    fontSize: FONT_SIZE.onBoardingDesc,
    lineHeight: 24,
  },
});
