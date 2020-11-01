import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewprotHeight} = Dimensions.get('window');

// 根据百分比获取宽度
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
// 根据百分比获取高度
function hp(percentage: number) {
  const value = (percentage * viewprotHeight) / 100;
  return Math.round(value);
}

export {viewportWidth, viewprotHeight, wp, hp};
