import React from "react";
import { categoryIcons } from "../../../assets/constants/data";
import { CustomIcon } from "../CustomIcon";
import { COLORS } from "../../../assets/theme";

type Props = {
  title: string;
};

export const CategorieCardIcon: React.FC<Props> = ({ title }) => {
  // map object
  const iconName = categoryIcons[title] ? categoryIcons[title] : "tree";

  return (
    <CustomIcon
      library="FontAwesome"
      name={iconName}
      size={20}
      color={COLORS.robinEggBlue}
    />
  );
};
