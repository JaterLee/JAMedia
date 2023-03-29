import {Dimensions} from 'react-native';

const baseLine = 750; // 设计稿px

const scaledSize = Dimensions.get('window');
export function toDips(px: number) {
  // const result = (px * scaledSize.width) / baseLine;
  // return Math.ceil(result);
  let result = (px * scaledSize.width) / baseLine;
  let res = result.toFixed(2);
  return Number(res);

  // return px;
}

export function getDeviceWidth() {
  return Number(Dimensions.get('window').width.toFixed(2));
}
export function getDeviceHeight() {
  return Dimensions.get('window').height;
}
export function getContentHeight() {
  return getDeviceHeight() - toDips(60);
}

export function getScreenHeight() {
  return Dimensions.get('screen').height;
}
