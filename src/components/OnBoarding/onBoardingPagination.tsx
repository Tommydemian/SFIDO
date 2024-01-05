import React from "react";
import { StyleSheet, View } from "react-native";
import { OnBoardingData } from "../../../assets/constants/data";
import { SharedValue } from "react-native-reanimated";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Dot } from "./Dot";

type Props = ViewProps & {
  data: OnBoardingData[];
  x: SharedValue<number>;
  customStyles?: object;
};

export const OnBoardingPagination: React.FC<Props> = ({
  data,
  x,
  customStyles,
}) => {
  return (
    <View style={[styles.paginationContainer, customStyles]}>
      {data.map((_, index) => (
        <Dot key={index} index={index} x={x} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
