// React and React-native imports
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

// External libraries imports
import * as AppleAuthentication from "expo-apple-authentication";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign, Entypo } from "@expo/vector-icons";

// Custom Component imports
import { SubmitButton } from "../components/SubmitButton";
import { OrDivider } from "../components/OrDivider";
import { AuthContainer } from "../components/AuthContainer";
import { AuthSwitchLink } from "../components/AuthSwitchLink";
import { AuthForm } from "../components/AuthForm";
import { OfficialLogo } from "../components/OfficialLogo";
import { SfidoWhiteTextLogo } from "../components/SfidoWhiteTextLogo";
import { NunitoText } from "../components/Fonts/NunitoText";
import { InputField } from "../components/InputField";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { GoogleButton } from "../components/GoogleButton";

// Custom Hooks imports
import { useDialogVisibility } from "../hooks/useDialogVisibility";
import { useGoogleAuthentication } from "../hooks/useGoogleAuthentication";

// Types and Constants imports
import { FormData } from "../types";
import { COLORS, SPACING } from "../../assets/theme";
import { AuthStackParams } from "../navigation/AuthStackNavigator";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import { useAuthContext } from "../contexts/AuthContext";
import { useGoogleContext } from "../contexts/GoogleContext";
import { useFormHandler } from "../hooks/useFormHandler";

import { useAppleAuthentication } from "../hooks/useAppleAuthentication";

import { RobotoText } from "../components/Fonts/RobotoText";
import { GoogleIcon } from "../components/GoogleIcon";

// Estilos y otros recursos

type NavigationProps = NativeStackScreenProps<AuthStackParams, "LoginScreen">;

export const LoginScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // context hook
  const { user, handleSignIn, errorMessageSignIn, setErrorMessageSignIn } =
    useAuthContext();
  const { isGoogleLinked, onGoogleButtonPress, linkGoogleAccount } =
    useGoogleContext();

  const { handlPasswordSecured, isPaswordSecured } = usePasswordVisibility();

  // dialogVisibility hook
  const { isVisible, showDialog, hideDialog } = useDialogVisibility();

  // useGoogleAuth hook:
  const { handleOnGoogleButtonPress } = useGoogleAuthentication();
  const { handleAppleSignIn } = useAppleAuthentication();

  const { control, emailRules, passwordRules, reset, handleSubmit } =
    useFormHandler("onSubmit", navigation);

  // function sign in
  const onSubmit = (data: FormData) => {
    handleSignIn(data.email, data.password, reset);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={user.loading} />

      {/* bg image container */}
      <AbsoluteFillBgImage imageKey="authbg" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <AuthContainer>
          <OfficialLogo style={{ alignSelf: "center" }} />
          <SfidoWhiteTextLogo style={{ marginVertical: 10 }} />

          {/* <DialogPopup visible={visible} email={email} setPassword={setPassword} googleCredential={googleCredential!} password={password} /> */}
          <NunitoText customStyles={styles.subHeader}>
            Your goals, your dreams, your journey means a lot.
          </NunitoText>

          <InputField
            autoCapitalize="none"
            control={control}
            placeholder="Email"
            name="email"
            leftIcon={
              <AntDesign name="user" size={30} color={COLORS.whiteText} />
            }
            setError={setErrorMessageSignIn}
            rules={emailRules}
          />

          <InputField
            autoCapitalize="none"
            control={control}
            placeholder="Password"
            name="password"
            secureTextEntry={isPaswordSecured}
            setError={setErrorMessageSignIn}
            handlePassworsSecured={handlPasswordSecured}
            leftIcon={<Entypo name="lock" size={30} color={COLORS.whiteText} />}
            rightIcon={
              <Entypo name="eye" size={24} color={COLORS.blackSecondaryText} />
            }
            rules={passwordRules}
          />

          <SubmitButton
            customStyles={styles.signInButton}
            onPress={handleSubmit(onSubmit)}
          >
            <NunitoText type="bold" customStyles={styles.signInButtonText}>
              Sing In
            </NunitoText>
          </SubmitButton>

          {errorMessageSignIn && (
            <NunitoText customStyles={styles.errorMessage}>
              {errorMessageSignIn}
            </NunitoText>
          )}

          {/* <AuthForm 
      submitButtonText='Sign In'
      onSignIn={onSignIn}
      >
    </AuthForm> */}
          <TouchableOpacity>
            <NunitoText
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
              customStyles={styles.forgotPassword}
            >
              Forgot your password?
            </NunitoText>
          </TouchableOpacity>

          <OrDivider />

          <View style={styles.providerButtonsContainer}>
            {/* Apple Login */}
            <View style={styles.container}>
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={30}
                style={styles.button}
                onPress={async () => {
                  console.log("Im here dude");

                  handleAppleSignIn();
                }}
              />
            </View>
            {/* <SubmitButton customStyles={styles.providerButton} onPress={handleOnGoogleButtonPress}>
        <RobotoText customStyles={styles.providerButtonText} type='bold' >Continue with Google</RobotoText>
    </SubmitButton> */}

            <GoogleButton onPress={handleOnGoogleButtonPress} />
          </View>

          <AuthSwitchLink
            actionText="Sign Up"
            navigationText="Dont have an account?"
            onActionPress={() => navigation.navigate("SignupScreen")}
          />
        </AuthContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.indigoDye,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: COLORS.whiteText,
    fontWeight: "bold",
  },
  heroImage: {
    height: 250, // Ajusta según sea necesario
    resizeMode: "contain", // Asegúrate de que la imagen se ajuste sin deformarse
    alignSelf: "center",
    marginVertical: 20, // Ajusta el espacio vertical
  },
  providerButtonsContainer: {
    justifyContent: "center",
    rowGap: SPACING.spacing20,
  },
  providerButton: {
    flexGrow: 1, // TODO: ask GPT
    backgroundColor: COLORS.black,
  },
  providerButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 5,
    width: "100%",
    backgroundColor: "red",
  },
  signInButtonText: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  subHeader: {
    fontSize: 22,
    textAlign: "center",
  },
  errorMessage: {
    color: COLORS.errorRed,
  },
  button: {
    width: "100%",
    height: 44,
  },
});
