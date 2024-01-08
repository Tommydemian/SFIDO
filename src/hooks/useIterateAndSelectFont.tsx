import { useState, useEffect } from "react";
import { useDemoMessageContext } from "../contexts/DemoMessageContext";

export const useIterateAndSelectFont = () => {
  const [fontIndex, setFontIndex] = useState(0);
  const { setFontSelected } = useDemoMessageContext();

  const fonts = [
    "NunitoRegular",
    "RobotoRegular",
    "MerriweatherRegular",
    "BebasNeueRegular",
    "YungJakesTextRegular",
  ];

  const fontIndexIncrease = () => {
    setFontIndex((prev) => {
      if (prev >= fonts.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  useEffect(() => {
    setFontSelected(fonts[fontIndex]);
  }, [fontIndex]);

  return { fontIndexIncrease };
};
