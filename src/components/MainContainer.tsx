import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
  children: React.ReactNode;
  customStyles?: object;
};

export const MainContainer: React.FC<Props> = ({
  children,
  customStyles,
  ...rest
}) => {
  return (
    <View {...rest} style={[styles.container, customStyles]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
});
