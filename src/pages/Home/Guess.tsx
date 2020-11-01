import IconFont from '@/assets/iconfont';
import {IGuess} from '@/models/home';
import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Alert} from 'react-native';
import Touchable from './../../components/Touchable';

interface IProps {
  data: IGuess[];
  onPress: (item: IGuess) => void;
}

class Guess extends PureComponent<IProps> {
  state = {};
  handleClick = (item: IGuess) => {
    const {onPress} = this.props;
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };
  handleChange = () => {
    Alert.alert('change');
  };
  renderItem = ({item}: {item: IGuess}) => {
    return (
      <Touchable
        style={styles.item}
        onPress={this.handleClick.bind(this, item)}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };
  render() {
    const {data} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.flexrow}>
            <IconFont name="icon-xihuan" />
            <Text style={styles.headerTitle}>猜你喜欢</Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={styles.moreText}>更多</Text>
            <IconFont name="icon-more" color="#6f6f6f" />
          </View>
        </View>
        <FlatList data={data} renderItem={this.renderItem} numColumns={3} />
        <Touchable style={styles.footer} onPress={this.handleChange}>
          <IconFont name="icon-huanyipi" color="red" />
          <Text style={styles.headerTitle}>换一批</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  item: {
    flex: 1,
    width: 100,
    marginVertical: 6,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    marginLeft: 5,
  },
  moreText: {
    color: '#6f6f6f',
  },
});

export default Guess;
