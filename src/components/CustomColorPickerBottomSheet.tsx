import React, { useMemo, forwardRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ColorBox } from "./ColorBox";
import { BORDER, BOX_COLORS, COLORS, SPACING } from "../../assets/theme";
import { useDemoMessageContext } from "../contexts/DemoMessageContext";

const CustomColorPickerBottomSheet = forwardRef<BottomSheet>((props, ref) => {
  const { setTextColor, textColor } = useDemoMessageContext();

  const snapPoints = useMemo(() => ["30%", "40%"], []); // Ajusta según la necesidad

  const colorBoxes = Object.values(BOX_COLORS).map((color) => (
    <ColorBox
      onPress={() => handleColorSelect(color)}
      key={color}
      color={color}
    />
  ));

  function handleColorSelect(color: string) {
    setTextColor(color);
  }

  useEffect(() => {
    console.log(textColor);
  }, [textColor]);

  return (
    <BottomSheet
      style={styles.bottomSheet}
      backgroundStyle={{ backgroundColor: COLORS.semiTransparent }}
      enablePanDownToClose={true}
      ref={ref}
      snapPoints={snapPoints}
    >
      <View style={styles.contentContainer}>{colorBoxes}</View>
    </BottomSheet>
  );
});

CustomColorPickerBottomSheet.displayName = "CustomColorPickerBottomSheet";

export { CustomColorPickerBottomSheet };

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: SPACING.spacing10,
    flexDirection: "row",
    gap: BORDER.border10,
    flexWrap: "wrap",
    justifyContent: "space-around", // Asegura un espaciado uniforme
  },
  colorBox: {
    margin: SPACING.spacing5, // Añade un poco de margen alrededor de cada caja
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
