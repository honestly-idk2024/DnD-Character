import {
    ViroARScene,
    ViroARSceneNavigator,
    ViroImage,
    ViroTrackingStateConstants,
    ViroTrackingReason,
  } from "@reactvision/react-viro";
  import React, { useState } from "react";
  import { StyleSheet } from "react-native";


  const MyARScene = () => {
    const [trackingStatus, setTrackingStatus] = useState(
      ViroTrackingStateConstants.TRACKING_UNAVAILABLE
    );
  
    const onARInitialized = (
      state: ViroTrackingStateConstants,
      reason: ViroTrackingReason
    ) => {
      setTrackingStatus(state);
    };
  
    return (
      <ViroARScene onTrackingUpdated={onARInitialized}>
        {trackingStatus == ViroTrackingStateConstants.TRACKING_NORMAL && (
          <ViroImage
            height={0.5}
            width={0.5}
            source={{uri: 'https://www.w3schools.com/images/w3schools_green.jpg'}}
            position={[0, 0, -1]}
          />
        )}
      </ViroARScene>
    );
  };


  export default function ArView(){
    return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: MyARScene,
        }}
        style={styles.f1}
      />
    );
  };
  
  var styles = StyleSheet.create({
    f1: { flex: 1 },
  });