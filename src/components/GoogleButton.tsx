import React from "react";
import { StyleSheet } from "react-native";
import { GoogleIcon } from "./GoogleIcon";
import { SubmitButton } from "./SubmitButton";
import { RobotoText } from "./Fonts/RobotoText";
import { COLORS, SPACING } from "../../assets/theme";

type Props = {
  onPress: () => void;
};

export const GoogleButton: React.FC<Props> = ({ onPress }) => {
  return (
    <SubmitButton onPress={onPress} customStyles={styles.button}>
      <RobotoText customStyles={styles.buttonContent} type="medium">
        <GoogleIcon width={15} height={15} style={styles.icon} />
        Continue with Google
      </RobotoText>
    </SubmitButton>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  buttonContent: {
    fontSize: 17,
  },
  icon: {
    marginRight: SPACING.spacing10,
  },
});
