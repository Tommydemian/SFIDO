import { useState, useEffect } from "react";
import { useCraftMessageContext } from "../contexts/CraftMessageContext";

export const useIterateAndSelectFont = () => {
  const [fontIndex, setFontIndex] = useState(0);
  const { setText } = useCraftMessageContext();

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
    setText((prevState) => ({ ...prevState, fontFamily: fonts[fontIndex] }));
  }, [fontIndex]);

  return { fontIndexIncrease };
};
