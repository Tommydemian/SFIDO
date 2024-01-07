import React, { createContext, useState, useContext } from "react";
import { COLORS } from "../../assets/theme";
import { initialImagesArr } from "../../assets/constants/data";

// Definición del tipo para el contexto
type DemoMessageContextType = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  modalSelectedImage: string;
  setModalSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  videoId: string;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  fontSelected: string;
  setFontSelected: React.Dispatch<React.SetStateAction<string>>;
};

// Creación del contexto
export const DemoMessageContext = createContext<
  DemoMessageContextType | undefined
>(undefined);

// Provider del contexto
export const DemoMessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [text, setText] = useState(
    "The future's still inside of me, therefore I just need to keep moving. As long as I am moving, there's nothing to fear.",
  );
  const [fontSelected, setFontSelected] = useState("");
  const [selectedImage, setSelectedImage] = useState(initialImagesArr[0].uri);
  const [modalSelectedImage, setModalSelectedImage] = useState(
    initialImagesArr[0].uri,
  );
  const [videoId, setVideoId] = useState("");
  const [textColor, setTextColor] = useState(COLORS.blackSecondaryText); // Color por defecto

  return (
    <DemoMessageContext.Provider
      value={{
        text,
        setText,
        selectedImage,
        setSelectedImage,
        modalSelectedImage,
        setModalSelectedImage,
        videoId,
        setVideoId,
        textColor,
        setTextColor,
        fontSelected,
        setFontSelected,
      }}
    >
      {children}
    </DemoMessageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useDemoMessageContext = () => {
  const context = useContext(DemoMessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
