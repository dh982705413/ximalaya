import {hp, viewportWidth, wp} from '@/utils/index';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {ICarousel} from '@/models/home';
import SnapCarousel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination,
} from 'react-native-snap-carousel';

const sliderWidth = viewportWidth;
const slidWidth = wp(95);
const slidHeight = hp(26);

interface IProps {
  data: ICarousel[];
}
class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  renderItem = (
    {item}: {item: ICarousel},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.image}}
        style={styles.image}
        containerStyle={styles.imageContainer}
        parallaxFactor={0.7}
        showSpinner
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxProps}
      />
    );
  };

  onSnapToItem = (index: number) => {
    this.setState({
      active: index,
    });
  };
  get pagination() {
    const {active} = this.state;
    const {data} = this.props;

    return (
      <View style={styles.paginationWrap}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          dotsLength={data.length}
          activeDotIndex={active}
        />
      </View>
    );
  }

  render() {
    const {data} = this.props;
    return (
      <View>
        <SnapCarousel
          data={data}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={slidWidth}
          hasParallaxImages
          loop
          autoplay
          onSnapToItem={this.onSnapToItem}
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  imageContainer: {
    width: slidWidth,
    height: slidHeight,
    borderRadius: 8,
    alignItems: 'center',
  },
  paginationWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
});

export default Carousel;
