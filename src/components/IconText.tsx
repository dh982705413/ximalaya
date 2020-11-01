import IconFont, {IconNames} from '@/assets/iconfont';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface IProps {
  icon: IconNames;
  text: string | number;
  iconColor?: string;
  iconDirection?: 'left' | 'right';
  style?: Object;
}

class IconText extends Component<IProps> {
  state = {};
  renderView = () => {
    const {text, icon, iconColor, style, iconDirection = 'left'} = this.props;
    if (iconDirection === 'left') {
      return (
        <View style={{...styles.container, ...style}}>
          <IconFont name={icon} color={iconColor} style={styles.mr} />
          <Text>{text}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.mr}>{text}</Text>
          <IconFont name={icon} color={iconColor} />
        </View>
      );
    }
  };
  render() {
    return this.renderView();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mr: {
    marginRight: 5,
  },
});

export default IconText;
