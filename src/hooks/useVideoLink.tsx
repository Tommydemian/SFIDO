import { useState, useEffect } from "react";
import { extractIdFromYoutubeLink } from "../utils/extractIdFromYoutubeLink";
import { useDemoMessageContext } from "../contexts/DemoMessageContext";

export const useVideoLink = () => {
  const { setVideoId, videoId } = useDemoMessageContext();

  const [videoLink, setVideoLink] = useState("");
  const [isLinkValid, setIsLinkValid] = useState<boolean | undefined>(
    undefined,
  );
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validateYouTubeLink = (link: string) => {
    const patterns = [
      /^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]+(\?.*)?$/, // Formato corto youtu.be
      /^https?:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+(&.*)?$/, // Formato completo
      /^https?:\/\/youtube\.com\/watch\?v=[a-zA-Z0-9_-]+(&.*)?$/, // Sin www
      /^https?:\/\/m\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+(&.*)?$/, // Versión móvil
    ];

    return patterns.some((pattern) => pattern.test(link));
  };

  useEffect(() => {
    if (isTouched) {
      setError(""); // Reset error state on each change
      const valid: boolean = validateYouTubeLink(videoLink);
      setIsLinkValid(valid);
      console.log(isLinkValid, "es valido");

      if (valid) {
        const id = extractIdFromYoutubeLink(videoLink);
        if (id) {
          setVideoId(id);
        }
      } else {
        setError("Invalid YouTube link. Please check the URL.");
        setVideoId(""); // Reset videoId if ID extraction fails
      }
    } else {
      setVideoId(""); // Reset videoId if link is not valid
    }
  }, [videoLink, setVideoId, videoId, isTouched]);

  useEffect(() => {
    console.log("istouched", isTouched);
    console.log("isLinkvalid:", isLinkValid);
  }, [isTouched, isLinkValid]);

  const handleInputChange = (newText: string) => {
    setIsTouched(true); // Marcar como tocado cuando el usuario cambia el texto
    setVideoLink(newText);
  };

  return {
    isLinkValid,
    handleInputChange,
    videoLink,
    error,
    setVideoLink,
    setIsTouched,
  };
};
