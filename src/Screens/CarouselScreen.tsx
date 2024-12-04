import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, createRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video, {VideoRef} from 'react-native-video';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';


interface IImageNode {
  extension: string,
  fileSize: number,
  filename: string,
  height: number,
  playableDuration: number,
  uri: string,
  width: number,
  type: string
}

interface INode {
  id: string;
  image: Object;
  type: string;
}

interface IState {
  activeIndex: number;
}

interface IProps {

}

export const SLIDER_WIDTH = responsiveWidth(100);
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

class CarouselScreen extends Component<IState,IProps> {
  carouselRef: React.RefObject<Carousel> = createRef<Carousel>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.carouselRef = createRef();
    

    this.videoRefs = {};
  }

  //  onHandleCarousels = (index) => {
  //   console.log('33-slide',index)
  //   Object.keys(this.videoRefs).forEach((key)=> {
  //     if (key !== index.toString()){
  //       this.videoRefs[key].pause();
  //     }
  //   })

  // }

  onHandleCarousels = (index) => {
    // console.log('33-slide', index);

    Object.keys(this.videoRefs).forEach(key => {
      if (key !== index.toString()) {
        this.videoRefs[key].pause();
      } else {
        this.videoRefs[key].seek(0);
      }
    });

    this.setState({activeIndex: index});
  };

  onPressChangeMediaButton = () => {
    this.props.navigation.navigate('CameraModel');
  };

  render() {
    const {activeIndex} = this.state;
    // console.log('51-state',activeIndex);
    const carouselData = this.props.route.params.selectedData;

    const Data = carouselData.map((item: {node: INode}) => ({
      // return item?.node
      image: item?.node,
    }));

    // console.log('60', Data);

    const CarouselCardItem = ({item, index}: {item: {image: {image: IImageNode, type:string}},index: number,}) => {
      console.log('90', item)
      const imgUrl = item?.image?.image?.uri;
      const extension = item?.image?.type;
      return (
        <View style={styles.container}>
          {extension === 'video' ? (
            <Video
              ref={ref => {
                this.videoRefs[index] = ref;
              }}
              controls
              source={{uri: item?.image?.image?.uri}}
              style={[styles.backgroundVideo, styles.image]}
              // repeat={true}
              paused={activeIndex !== index}
            />
          ) : (
            <Image source={{uri: imgUrl}} style={styles.image} />
          )}
        </View>
      );
    };

    return (
      <SafeAreaView>
        <View>
          <View style={styles.carouselSlide}>
            <Carousel
              layout="default"
              layoutCardOffset={9}
              data={Data}
              ref={this.carouselRef}
              renderItem={({item, index}: {item: INode, index: number}) => (
                <CarouselCardItem item={item} index={index} />
              )}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              // inactiveSlideShift={0}
              useScrollView={true}
              // scrollEnabled={true}
              // onScroll={this.onHandleCarousels}
              onSnapToItem={this.onHandleCarousels}
              // onScrollEnd={this.onHandleCarousels}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={this.onPressChangeMediaButton}>
              <Text style={styles.uploadMediaText}>Change Media</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default CarouselScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    height: responsiveHeight(50),
    width: responsiveWidth(100),
    borderRadius: 12,
  },
  changeButton: {
    backgroundColor: '#1E283A',
  },
  carousel: {
    width: responsiveWidth(100),
    height: 500,
  },
  container: {
    marginTop: responsiveHeight(10),
    // background:,
    borderRadius: 8,
    width: responsiveWidth(95),
    height: 250,
    paddingBottom: 40,
    alignSelf: 'center',

  },
  image: {
    width: '100%',
    height: '100%',

    // height: 180,
    borderRadius: 12,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
  carouselSlide: {
    // borderWidth: 2,
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    padding: 12,
    backgroundColor: '#1E283A',
    borderRadius: 18,
  },
  uploadMediaText: {
    fontSize: 15,
    color: 'white',
  },
  btnContainer: {
    // justifyContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
    marginTop: 20,
    // width: responsiveWidth(75),
    // height: responsiveHeight(15),
  },
});
