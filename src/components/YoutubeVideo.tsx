import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";

type Props = {
    videoId: string
}

export const YoutubeVideo: React.FC<Props> = ({videoId}) => {
    const [playing, setPlaying] = useState(false);
  
   const playerRef = useRef<YoutubeIframeRef>(null);

  const onStateChange = useCallback((state:string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  
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
      <Button
        title="log details"
        onPress={() => {
          playerRef.current?.getCurrentTime().then(
            currentTime => console.log({currentTime})
          );

          playerRef.current?.getVolume().then(
            getVolume => console.log({getVolume})
          );
        }}
      />
    </View>
  )
}