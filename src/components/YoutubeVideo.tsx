import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Alert } from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";

type Props = {
  videoId: string;
  isVisible: boolean;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const YoutubeVideo: React.FC<Props> = ({
  videoId,
  isVisible,
  playing,
  setPlaying,
}) => {
  // const [playing, setPlaying] = useState(false);
  const playerRef = useRef<YoutubeIframeRef>(null);

  useEffect(() => {
    console.log(playing, "playing");
  }, [playing, setPlaying]);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);

  return (
    <View>
      <YoutubePlayer
        ref={playerRef}
        height={300}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        volume={100}
      />
    </View>
  );
};
