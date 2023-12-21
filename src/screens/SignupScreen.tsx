// React and React-native imports
import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// External libraries imports

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";

// Custom Component imports
import { SubmitButton } from "../components/SubmitButton";

import { AuthContainer } from "../components/AuthContainer";
import { AuthSwitchLink } from "../components/AuthSwitchLink";

import { OfficialLogo } from "../components/OfficialLogo";
import { SfidoWhiteTextLogo } from "../components/SfidoWhiteTextLogo";
import { NunitoText } from "../components/Fonts/NunitoText";
import { InputField } from "../components/InputField";
import { AbsoluteFillBgImage } from "../components/AbsoluteFillBgImage";

// Custom Hooks imports
import { useDialogVisibility } from "../hooks/useDialogVisibility";
import { useFormHandler } from "../hooks/useFormHandler";

// Types and Constants imports
import { FormData } from "../types";
import { COLORS } from "../../assets/theme";
import { AuthStackParams } from "../navigation/AuthStackNavigator";
import { useAuthContext } from "../contexts/AuthContext";

// Estilos y otros recursos

type Props = NativeStackScreenProps<AuthStackParams, "LoginScreen">;

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  // conext hook
  const { user, handleSignUp, errorMessageSignUp, setErrorMessageSignUp } =
    useAuthContext();

  // dialogVisibility hook
  const { isVisible, showDialog, hideDialog } = useDialogVisibility();

  const { control, emailRules, handleSubmit, passwordRules } = useFormHandler(
    "onChange",
    navigation,
  );

  // function sign up
  const onSubmit = ({ email, password }: FormData) => {
    handleSignUp(email, password, reset);
  };

  useEffect(() => {
    console.log(auth().currentUser);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={user.loading} />

      {/* Contenedor de imagen de fondo */}
      <AbsoluteFillBgImage imageKey="authbg" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <AuthContainer>
          <OfficialLogo style={{ alignSelf: "center" }} />
          <SfidoWhiteTextLogo style={{ marginVertical: 10 }} />

          {/* Texto descriptivo para la pantalla de registro */}
          <NunitoText customStyles={styles.subHeader}>
            Join us and start your journey
          </NunitoText>

          <InputField
            autoCapitalize="none"
            control={control}
            placeholder="Email"
            name="email"
            rules={emailRules}
            setError={setErrorMessageSignUp}
          />

          <InputField
            autoCapitalize="none"
            control={control}
            placeholder="Password"
            name="password"
            rules={passwordRules}
            setError={setErrorMessageSignUp}
          />

          <SubmitButton onPress={handleSubmit(onSubmit)}>
            <NunitoText customStyles={styles.signInButtonText} type="bold">
              Sing Up
            </NunitoText>
          </SubmitButton>

          {errorMessageSignUp && (
            <NunitoText customStyles={styles.errorMessage}>
              {errorMessageSignUp}
            </NunitoText>
          )}

          <AuthSwitchLink
            actionText="Sign In"
            navigationText="Already have an account?"
            onActionPress={() => navigation.navigate("LoginScreen")}
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
    backgroundColor: COLORS.blackBg,
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
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: 10,
  },
  providerButton: {
    flexGrow: 1, // TODO: ask GPT
    backgroundColor: COLORS.black,
  },
  providerButtonText: {
    textAlign: "center",
  },
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 5,
    width: "100%",
    backgroundColor: "red",
  },
  signInButton: {
    backgroundColor: COLORS.folly,
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
});
