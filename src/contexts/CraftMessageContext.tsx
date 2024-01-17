import React, { createContext, useState, useContext } from "react";
import { COLORS } from "../../assets/theme";
import { initialImagesArr } from "../../assets/constants/data";
import { ImageItem } from "../types";

// Definición del tipo para el contexto
type CraftMessageContextType = {
  text: {
    content: string;
    color: string;
    fontFamily: string;
  };
  setText: React.Dispatch<
    React.SetStateAction<{
      content: string;
      color: string;
      fontFamily: string;
    }>
  >;
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  imageList: ImageItem[];
  setImageList: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  videoId: string;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
};

// Creación del contexto
export const CraftMessageContext = createContext<
  CraftMessageContextType | undefined
>(undefined);

// Provider del contexto
export const CraftMessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [text, setText] = useState({
    content:
      "The future's still inside of me, therefore I just need to keep moving. As long as I am moving, there's nothing to fear.",
    color: COLORS.blackSecondaryText,
    fontFamily: "",
  });
  const [selectedImage, setSelectedImage] = useState(initialImagesArr[0].uri);
  const [imageList, setImageList] = useState<ImageItem[]>(initialImagesArr);
  const [videoId, setVideoId] = useState("");

  return (
    <CraftMessageContext.Provider
      value={{
        text,
        setText,
        selectedImage,
        setSelectedImage,
        imageList,
        setImageList,
        videoId,
        setVideoId,
      }}
    >
      {children}
    </CraftMessageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCraftMessageContext = () => {
  const context = useContext(CraftMessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
