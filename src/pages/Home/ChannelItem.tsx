import IconText from '@/components/IconText';
import {IChannel} from '@/models/home';
import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Touchable from './../../components/Touchable';

interface IProps {
  data: IChannel;
  onPress: (data: IChannel) => void;
}

class ChannelItem extends PureComponent<IProps> {
  state = {};
  onPress = () => {
    const {data, onPress} = this.props;
    if (typeof onPress === 'function') {
      onPress(data);
    }
  };
  render() {
    const {data} = this.props;
    return (
      <Touchable style={styles.container} onPress={this.onPress}>
        <Image source={{uri: data.image}} style={styles.image} />
        <View style={styles.info}>
          <View>
            <Text>{data.title}</Text>
            <Text style={styles.remark} numberOfLines={1}>
              {data.remark}
            </Text>
          </View>
          <View style={styles.footer}>
            <IconText
              icon="icon-V"
              text={data.played}
              iconColor="red"
              style={styles.item}
            />
            <IconText
              icon="icon-shengyin"
              text={data.playing}
              iconColor="red"
            />
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
  },
  info: {
    width: '70%',
    justifyContent: 'space-between',
  },
  item: {
    width: 50,
    marginRight: 15,
  },
  remark: {
    backgroundColor: '#f8f8f8',
    padding: 4,
  },
});
export default ChannelItem;
