import {NativeModules} from 'react-native/types';

class _JAMediaMoudle {
  get mediaMoudle() {
    return NativeModules.MediaMoudle;
  }
}

export const JAMediaMoudle = new _JAMediaMoudle();
