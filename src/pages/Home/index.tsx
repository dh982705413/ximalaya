import React, {PureComponent} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  View,
  Alert,
  Text,
  StyleSheet,
} from 'react-native';
import {RootStackNavigation} from '../../navigator';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../models';
import Carousel from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';
import {IChannel, IGuess} from '@/models/home';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousels: home.carousels,
  guess: home.guess,
  channel: home.channel,
  hasMore: home.pagination.hasMore,
  loading: loading.effects['home/fetchChannel'],
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

class Home extends PureComponent<IProps> {
  state = {refreshing: false};
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
    dispatch({
      type: 'home/fetchGuess',
    });
    dispatch({
      type: 'home/fetchChannel',
    });
  }
  onPress = (data: IChannel) => {
    Alert.alert(data.title, data.remark);
  };
  onGuessPress = (item: IGuess) => {
    Alert.alert(item.title);
  };
  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.onPress} />;
  };
  keyExtractor = (item: IChannel) => {
    return item.id;
  };
  // 加载更多
  onEndReached = () => {
    const {dispatch, loading, hasMore} = this.props;
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: 'home/fetchChannel',
      playload: {
        loadMore: true,
      },
    });
  };
  // 下拉刷新
  onRefresh = () => {
    const {dispatch} = this.props;
    this.setState({
      refreshing: true,
    });
    dispatch({
      type: 'home/fetchChannel',
      callback: () => {
        this.setState({
          refreshing: false,
        });
      },
    });
  };
  get header() {
    const {carousels, guess, channel} = this.props;
    return (
      <View>
        <Carousel data={carousels} />
        <Guess data={guess} onPress={this.onGuessPress} />
        <FlatList data={channel} renderItem={this.renderItem} />
      </View>
    );
  }
  get footer() {
    const {hasMore, loading, channel} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>--我是有底线的--</Text>
        </View>
      );
    }
    if (loading && hasMore && channel.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中...</Text>
        </View>
      );
    }
  }
  get empty() {
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  }
  render() {
    const {channel} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channel}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 10,
    fontSize: 28,
  },
});

export default connector(Home);
