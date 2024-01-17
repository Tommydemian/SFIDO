import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PostMessageStackParams } from "../navigation/PostStackNavigator";

import { CraftMessageHeader } from "../components/Demo/CraftMessageHeader";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";

import { COLORS } from "../../assets/theme";

export type PostMediaNavigationProps = NativeStackScreenProps<
  PostMessageStackParams,
  "PostMessageMediaScreen"
>;

export const PostMessageMediaScreen: React.FC<PostMediaNavigationProps> = ({
  navigation,
}) => {
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <TouchableOpacity
        style={styles.flex1}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        <SafeAreaView style={styles.container}>
          <AbsoluteFillBgImage imageKey="vector" />

          <View style={styles.spacer} />
          <CraftMessageHeader
            navigation={navigation}
            title="Include a Picture"
            type="media"
          />

          {/* <ImageCarouselComponent
            imageList={imageList}
            SIZE={SIZE}
            SPACER={SPACER}
            handleSelectImage={handleSelectImage}
            selectedImage={selectedImage}
            x={x}
          /> */}

          <Animated.FlatList
            ref={flatListRef}
            data={imageList}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: SPACING.spacing20 }}
            decelerationRate={0}
            onScroll={onScroll}
            snapToInterval={SIZE}
            snapToAlignment={"start"}
            // getItemLayout={getItemLayout}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              return (
                <CarouselItemComponent
                  x={x}
                  SIZE={SIZE}
                  SPACER={SPACER}
                  index={index}
                  item={item}
                  SCREEN_WIDTH={SCREEN_WIDTH}
                  handleSelectImage={handleSelectImage}
                  selectedImage={selectedImage}
                />
              );
            }}
            ListHeaderComponent={<View style={{ width: SPACER }} />}
            ListFooterComponent={<View style={{ width: SPACER }} />}
          />

          <View style={styles.cameraAndVideoContainer}>
            <GalleryImageSelector
              onImageSelected={handleSelectImage}
              imageList={imageList}
              setImageList={setImageList}
            />

            <Animated.View
              style={[styles.videoIconContainer, iConContainerStyle]}
            >
              <CustomIcon
                library="Entypo"
                name="video"
                size={28}
                color={videoId === "" ? COLORS.folly : COLORS.white}
                onPress={handleOpen}
              />
            </Animated.View>
          </View>

          <DemoNextButton navigation={navigation} type="media" />

          <CustomBottomSheet
            snapPoint={snapPoint}
            setIsBottomSheetVisible={setIsBottomSheetVisible}
            isBottomSheetVisible={isBottomSheetVisible}
            closeIconPresent={false}
          >
            <VideoLinkInput />
          </CustomBottomSheet>
        </SafeAreaView>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueNCS,
  },
});
