import React from 'react';
import {requireNativeComponent} from 'react-native';

class RNTJAVideoView extends React.Component {
  render(): React.ReactNode {
    return <RNTJAVideo {...this.props} />;
  }
}
const RNTJAVideo = requireNativeComponent('RNTJAVideo');
export default RNTJAVideoView;
