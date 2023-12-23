import React, { createContext, useState, useContext } from "react";
import { COLORS } from "../../assets/theme";

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
};

// Creación del contexto
export const DemoMessageContext = createContext<
  DemoMessageContextType | undefined
>(undefined);

// Provider del contexto
export const DemoMessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [modalSelectedImage, setModalSelectedImage] = useState("");
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
