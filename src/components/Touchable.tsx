import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Touchable: React.FC<TouchableOpacityProps> = (props) => (
  <TouchableOpacity activeOpacity={0.8} {...props} />
);

export default Touchable;
