import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";
import React, {useState, useCallback, useRef, useEffect} from 'react'


export const UserProfileScreen = () => {
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
        videoId={"fDujDj1CxIs"}
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

const styles = StyleSheet.create({

})