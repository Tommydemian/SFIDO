import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";

import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Components
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { AuthContainer } from "../components/AuthContainer";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";
import { NunitoText } from "../components/Fonts/NunitoText";

import { useAuthContext } from "../contexts/AuthContext";

// types
import { FormData } from "../types";
import { FONT_SIZE, COLORS, SPACING } from "../../assets/theme";
import { AuthStackParams } from "../navigation/AuthStackNavigator";
import { useFormHandler } from "../hooks/useFormHandler";

type ForgotPasswordNavigationProps = NativeStackScreenProps<
  AuthStackParams,
  "ForgotPasswordScreen"
>;

export const ForgotPasswordScreen: React.FC<ForgotPasswordNavigationProps> = ({
  navigation,
}) => {
  const {
    user,
    handleForgotPassword,
    errorMessageForgotPassword,
    setErrorMessageForgotPassword,
  } = useAuthContext();

  const { control, emailRules, handleSubmit } = useFormHandler(
    "onChange",
    navigation,
  );

  // fucntion used to control feedback base on operation success
  const onHandleForgotPassword = (data: FormData) => {
    handleForgotPassword(data.email)
      .then((message) => {
        console.log(message); // "Email sent successfully"
        navigation.navigate("LoginScreen");
      })
      .catch((err) => {
        console.log(err); // Manejo de errores
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={user.loading} />
      {/* bg image container */}
      <AbsoluteFillBgImage imageKey="authbg" />

      <AuthContainer>
        <NunitoText type="bold" customStyles={styles.title}>
          Forgot Password?
        </NunitoText>
        <NunitoText customStyles={styles.subtitle} type="regular">
          Do not worry! we will help you recover your password
        </NunitoText>

        <InputField
          autoCapitalize="none"
          control={control}
          placeholder="Email"
          name="email"
          leftIcon={
            <AntDesign name="mail" size={35} color={COLORS.whiteText} />
          }
          setError={setErrorMessageForgotPassword}
          rules={emailRules}
        />

        <SubmitButton onPress={handleSubmit(onHandleForgotPassword)}>
          <NunitoText customStyles={styles.submitButtonText} type="bold">
            Send
          </NunitoText>
        </SubmitButton>

        {errorMessageForgotPassword && (
          <NunitoText customStyles={styles.errorMessage}>
            {errorMessageForgotPassword}
          </NunitoText>
        )}
      </AuthContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.indigoDye,
  },
  title: {
    fontSize: 35,
    alignSelf: "center",
    marginVertical: SPACING.spacing20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: SPACING.spacing10,
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 18,
  },
  errorMessage: {
    color: COLORS.errorRed,
  },
});
