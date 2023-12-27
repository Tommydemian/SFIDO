import { useForm } from "react-hook-form";
import { type FormData } from "../types";
import { useEffect } from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParams } from "../navigation/AuthStackNavigator";

type Mode =
  | "onBlur"
  | "onChange"
  | "onSubmit"
  | "onTouched"
  | "all"
  | undefined;

type Navigation = NativeStackNavigationProp<
  AuthStackParams,
  keyof AuthStackParams
>;

export const useFormHandler = (mode: Mode, navigation: Navigation) => {
  // useForm hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    clearErrors,
  } = useForm<FormData>({
    mode: mode && mode,
  });

  const setupFormNavigationCleanup = () => {
    const unsubscribe = navigation.addListener("blur", () => {
      clearErrors();
      reset();
    });

    return unsubscribe;
  };

  useEffect(() => {
    return setupFormNavigationCleanup();
  }, [navigation, clearErrors, reset]);

  // Rules for the email input field
  const emailRules = {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email format",
    },
  };

  // Rules for the password input field
  const passwordRules = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  };

  return {
    passwordRules,
    emailRules,
    reset,
    watch,
    control,
    handleSubmit,
    clearErrors,
    setupFormNavigationCleanup,
  };
};
