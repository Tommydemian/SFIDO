import React, { useState } from "react";

const useHandleMessageContent = () => {
  const [image, setImage] = useState<string | null>("");
  const [text, setText] = useState("");

  return { image, setImage, text, setText };
};

export default useHandleMessageContent;
