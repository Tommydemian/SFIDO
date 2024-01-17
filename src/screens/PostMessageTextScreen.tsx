import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PostMessageStackParams } from "../navigation/PostStackNavigator";
import { useCraftMessageContext } from "../contexts/CraftMessageContext";
import { COLORS } from "../../assets/theme";
import { MainContainer } from "../components/MainContainer";
import { NunitoText } from "../components/Fonts/NunitoText";
import { CraftMessageTextInput } from "../components/Demo/CraftMessageTextInput";
import { CraftMessageTextActions } from "../components/Demo/CraftMessageTextActions";
import { useToggle } from "../hooks/useToggle";
import { CraftMessageHeader } from "../components/Demo/CraftMessageHeader";
import { NextButton } from "../components/Post/NextButton";

export type PostTextNavigationProps = NativeStackScreenProps<
  PostMessageStackParams,
  "PostMessageTextScreen"
>;

export const PostMessageTextScreen: React.FC<PostTextNavigationProps> = ({
  navigation,
}) => {
  const { text, setText } = useCraftMessageContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFontPickerOpen, toggle] = useToggle();

  useEffect(() => {
    setText(() => ({
      color: COLORS.blackSecondaryText,
      content:
        "The future's still inside of me, therefore I just need to keep moving. As long as I am moving, there's nothing to fear.",
      fontFamily: "",
    }));
    console.log(text);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <MainContainer> */}
      {/* container */}
      <View style={{ paddingHorizontal: 40, paddingVertical: 40, flex: 1 }}>
        <CraftMessageHeader
          navigation={navigation}
          title="Craft a Message"
          type="text"
        />
        <CraftMessageTextInput
          placeholder="Write what you need to listen..."
          handleFontPickerOpen={toggle}
          render={({ handleWriteMyOwn }) => {
            return (
              <CraftMessageTextActions
                section="Post"
                handleWriteMyOwn={handleWriteMyOwn}
              />
            );
          }}
        />
        <View style={styles.flex1}>
          <NextButton navigation={navigation} type="text" />
        </View>
      </View>
      {/* </MainContainer> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueNCS,
  },
  flex1: {
    flex: 1,
  },
});
