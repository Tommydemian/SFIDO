import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { CarouselItemComponent } from "./CarouselItemComponent";
import { SPACING } from "../../../assets/theme";
import Animated, { SharedValue } from "react-native-reanimated";
import { ImageItem } from "../../types";

type Props = {
  imageList: ImageItem[];
  SIZE: number;
  SPACER: number;
  handleSelectImage: (uri: string) => void;
  selectedImage: string;
  x: SharedValue<number>;
};

export const ImageCarouselComponent: React.FC<Props> = ({
  imageList,
  SIZE,
  SPACER,
  handleSelectImage,
  selectedImage,
  x,
}) => {
  const renderItem = ({ item, index }) => (
    <CarouselItemComponent
      x={x}
      SIZE={SIZE}
      SPACER={SPACER}
      index={index}
      item={item}
      SCREEN_WIDTH={SIZE}
      handleSelectImage={handleSelectImage}
      selectedImage={selectedImage}
    />
  );

  return (
    <Animated.FlatList
      data={imageList}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      decelerationRate={0}
      snapToInterval={SIZE}
      snapToAlignment={"start"}
      renderItem={renderItem}
      ListHeaderComponent={<View style={{ width: SPACER }} />}
      ListFooterComponent={<View style={{ width: SPACER }} />}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: SPACING.spacing20,
  },
});
