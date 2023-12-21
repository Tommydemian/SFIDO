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

  const validateLink = (link: string) => {
    return /^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}$/.test(link);
  };

  useEffect(() => {
    if (isTouched) {
      setError(""); // Reset error state on each change
      const valid = validateLink(videoLink);
      setIsLinkValid(valid);

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
    console.log(isTouched);
    console.log(isLinkValid);
  }, [isTouched]);

  const handleInputChange = (newText: string) => {
    setIsTouched(true); // Marcar como tocado cuando el usuario cambia el texto
    setVideoLink(newText);
  };

  return { isLinkValid, handleInputChange, videoLink, error, setVideoLink };
};
