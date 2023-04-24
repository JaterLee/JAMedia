import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import Video, {VideoProperties} from 'react-native-video';
import RNTJAVideoView from '../RNTJAVideoView';

export interface CommonVideoProps extends VideoProperties {}
export default (props: CommonVideoProps) => {
  const videoRef = useRef<Video>();
  const [paused, setPaused] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        props.style,
        {
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={() => {
        setPaused(!paused);
      }}>
      <RNTJAVideoView
        {...props}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </TouchableOpacity>
  );
};
