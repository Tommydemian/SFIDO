import { StyleSheet, View, TextInput } from "react-native";
import React, { useEffect } from "react";
import { DemoIconButton } from "./Demo/DemoIconButton";
import { CustomIcon } from "./CustomIcon";
import { useVideoLink } from "../hooks/useVideoLink";
import { PasteButton } from "./PasteButton";
import { SPACING, COLORS, BORDER } from "../../assets/theme";
import { NunitoText } from "./Fonts/NunitoText";

export const VideoLinkInput = () => {
  const {
    isLinkValid,
    handleInputChange,
    videoLink,
    error,
    setVideoLink,
    setIsTouched,
  } = useVideoLink();

  useEffect(() => {
    console.log(videoLink);
  }, [videoLink]);

  return (
    <>
      <View style={styles.videoLinkContainer}>
        {/* YoutubeLink */}
        <View
          style={[
            styles.videoLinkInputContainer,
            isLinkValid === false
              ? styles.invalidLink
              : isLinkValid === true
                ? styles.validLink
                : null,
          ]}
        >
          <TextInput
            style={styles.videoLinkInput}
            value={videoLink}
            multiline={false}
            //returnKeyType='done'
            numberOfLines={2}
            placeholder={"https://youtu.be/fnGcsc4Wrr0?si=Dn0H_4OHf3gmlx-u"}
            onChangeText={handleInputChange}
            onEndEditing={(e) => handleInputChange(e.nativeEvent.text)}
            keyboardType="default"
          />
          <PasteButton
            setCopiedText={setVideoLink}
            customStyles={styles.pasteButton}
            setIsTouched={setIsTouched}
          />
          {isLinkValid === true ? (
            <CustomIcon
              customStyles={styles.videoLinkInputIcon}
              library="AntDesign"
              name="checkcircle"
              size={24}
              color={COLORS.successGreen}
            />
          ) : isLinkValid === false ? (
            <CustomIcon
              customStyles={styles.videoLinkInputIcon}
              library="Entypo"
              name="circle-with-cross"
              size={24}
              color={COLORS.errorRed}
            />
          ) : null}
        </View>
      </View>
      {error && (
        <NunitoText type="bold" customStyles={styles.errorMessage}>
          {error}
        </NunitoText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  videoLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: SPACING.spacing10,
    paddingTop: SPACING.spacing20,
    width: "80%",
    alignSelf: "center",
  },
  videoLinkInput: {
    alignSelf: "center",
    paddingRight: SPACING.spacing20,
  },
  videoLinkInputContainer: {
    backgroundColor: "#FFFFFFAA", // Semi-transparente
    minHeight: SPACING.spacing50, // Ajusta este valor según sea necesario
    paddingHorizontal: SPACING.spacing10,
    paddingVertical: SPACING.spacing10,
    borderRadius: BORDER.border30, // Aumenta para más redondez
    marginBottom: 10,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 0, // Desplazamiento horizontal de la sombra
      height: 2, // Desplazamiento vertical de la sombra
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio de difuminado de la sombra
    elevation: 5, // Elevación para Android
  },
  validLink: {
    borderColor: COLORS.successGreen,
    borderWidth: 2,
  },
  invalidLink: {
    borderColor: COLORS.errorRed,
    borderWidth: 2,
  },
  videoLinkInputIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  errorMessage: {
    color: COLORS.errorRed,
    fontSize: 14,
    marginTop: 5, // Añade un pequeño margen en la parte superior para separarlo del TextInput
    width: "100%",
    textAlign: "center",
  },
  videoButton: {
    backgroundColor: COLORS.claret,
  },
  pasteButton: {
    position: "absolute",
    top: 2,
    right: 2,
    padding: SPACING.spacing5,
  },
});
