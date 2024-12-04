import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  Alert,
} from 'react-native';

import Modal from 'react-native-modal';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import React, {Component} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {CameraRoll, PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IState {
  isVisibleModal: boolean;
  photos: PhotoIdentifier[];
  selectedArray: ISelectArray[];
  isCondition: boolean;
}

interface INode {
  extension: string;
  fileSize: number;
  filename: string;
  height: number;
  playableDuration: number;
  uri: string;
  width: number;
  type: string;
}

interface ISelectArray {
  node: {id: string; image: Object; type: string};
}
interface IProps{}
export default class CameraModel extends Component<IProps, IState, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isVisibleModal: false,
      photos: [],
      selectedArray: [],
      isCondition: false,
    };
  }

  onCloseModel = () => {
    this.setState({isVisibleModal: false, selectedArray: []});
  };

  onPressUploadButton = () => {
    // console.log('69', this.state);
    if (this.state.selectedArray.length > 0) {
      this.setState({isVisibleModal: false});
      this.props.navigation.navigate('CarouselScreen', {
        selectedData: this.state.selectedArray,
      });

      this.setState({selectedArray: []});
    } else {
      Alert.alert('Please Select Atleast one Media file');
    }

    // console.log('93', this.state.selectedArray.length);
  };

  renderItemImage = (item: {}) => {
    const {selectedArray} = this.state;

    const imageUrl = item?.node?.image?.uri;
    const isSelected = selectedArray.some(
      i => i?.node?.image?.uri === imageUrl,
    );

    return (
      <View style={styles.imgContainer}>
        <TouchableOpacity onPress={() => this.onPressEachImage(item)}>
          <Image
            key={imageUrl}
            source={{uri: imageUrl}}
            style={styles.modelImages}
          />
        </TouchableOpacity>
        {isSelected && (
          <View style={styles.checkIcon}>
            <Entypo color="#ffffff" name="check" size={15} />
          </View>
        )}
      </View>
    );
  };

  onPressUploadMediaButton = () => {
    // console.log('83', this.state)
    this.setState({isVisibleModal: true});
    // console.log('83', this.state);
    if (Platform.OS === 'android') {
      const checkPermissions = async () => {
        const imageAccess = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        const videoAccess = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
        const externalStorageAccess = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );

        if (
          imageAccess == RESULTS.BLOCKED ||
          videoAccess == RESULTS.BLOCKED ||
          externalStorageAccess == RESULTS.BLOCKED
        ) {
          openSettings('application');
        } else if (
          imageAccess == RESULTS.DENIED ||
          videoAccess == RESULTS.DENIED ||
          externalStorageAccess == RESULTS.DENIED
        ) {
          const imageReqAccess = await request(
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          );
          const externalStorageReqAccess = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );

          if (
            imageReqAccess == RESULTS.GRANTED ||
            externalStorageReqAccess == RESULTS.GRANTED
          ) {
            const res = await CameraRoll.getPhotos({
              first: 100,
              assetType: 'All',
            });
            this.setState({photos: res.edges});
          }
        } else {
          const imageReqAccess = await request(
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          );
          const externalStorageReqAccess = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );

          if (
            imageReqAccess == RESULTS.GRANTED ||
            externalStorageReqAccess == RESULTS.GRANTED
          ) {
            const res = await CameraRoll.getPhotos({
              first: 100,
              assetType: 'All',
            });
            console.log('139-res', res);
            this.setState({photos: res.edges});
          }
        }
      };

      checkPermissions();
    } else {
      const checkPermissions = async () => {
        const access = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        // console.log('113', access);
        if (access == RESULTS.LIMITED || access == RESULTS.GRANTED) {
          const res = await CameraRoll.getPhotos({
            first: 100,
            assetType: 'All',
          });
          console.log('res-156', res);
          this.setState({photos: res.edges});
        } else {
          openSettings('application');
        }
      };

      checkPermissions();
    }
  };

  onPressEachImage = (item: {}) => {
    // console.log('257',item)


    const imageUri = item?.node?.image?.uri;

    this.setState(prevState => {
      const isSelected = prevState.selectedArray.some(
        i => i?.node?.image?.uri === imageUri,
      );
      let newSelectedArray;

      if (isSelected) {
        newSelectedArray = prevState.selectedArray.filter(
          i => i?.node?.image?.uri !== imageUri,
        );
      } else {
        newSelectedArray = [...prevState.selectedArray, item];
      }

      if (newSelectedArray.length <= 5) {
        return {
          selectedArray: newSelectedArray,
          selectedImageUri: isSelected ? null : imageUri,
        };
      }
    });
  };

  render() {
    const {isVisibleModal, photos} = this.state;
    // console.log('224',photos)
    return (
      <SafeAreaView>
        <View style={styles.mediaText}>
          <View style={styles.btnContainer}>
            <Text style={styles.textOne}>Upload Media</Text>
            <Text>Images, videos and Gif</Text>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={this.onPressUploadMediaButton}>
              <Text style={styles.uploadMediaText}>Upload Media</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          isVisible={isVisibleModal}
          // animationOut="slideInDown"
          onBackdropPress={() => this.setState({isVisibleModal: false})}>
          <View style={styles.modelContainer}>
            <View style={styles.topContent}>
              <Text style={styles.uploadText}>Upload from Media</Text>
              <Entypo onPress={this.onCloseModel} name="cross" size={30} />
            </View>
            <View style={{height: responsiveHeight(40)}}>
              <FlatList
                data={photos}
                showsVerticalScrollIndicator
                numColumns={4}
                keyExtractor={item => item?.node?.image.uri}
                renderItem={({item}) => this.renderItemImage(item)}
              />
            </View>
            <View style={styles.uploadBtnContainer}>
              <TouchableOpacity
                onPress={this.onPressUploadButton}
                style={styles.uploadButton}>
                <Text style={styles.uploadBtnText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.modelContainer}>
            <View style={styles.topContent}>
              <Text style={styles.uploadText}>Upload from Media</Text>
              <Entypo onPress={this.onCloseModel} name="cross" size={30} />
            </View>
            <View style={{height: 350}}>
              <FlatList
                data={photos}
                numColumns={4}
                keyExtractor={item => item?.node?.image.uri}
                renderItem={({item}) => this.renderItemImage(item)}
              />
            </View>

            <TouchableOpacity
              onPress={this.onPressUploadButton}
              style={styles.uploadButton}>
              <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
          </View>  */}
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: '#F1F6FA',
    width: responsiveWidth(110),
    height: responsiveHeight(70),
    marginTop: responsiveHeight(60),
    // borderWidth: 5,
    marginLeft: -20,
  },
  content: {
    borderWidth: 1,
    margin: 10,
  },
  topContent: {
    flexDirection: 'row',
    width: responsiveWidth(100),
    marginLeft: 0,
    padding: 10,
    // borderWidth: 3,
    justifyContent: 'space-between',
    margin: 10,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: 700,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: responsiveWidth(100),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modelImages: {
    width: responsiveWidth(22),
    height: 100,
    borderRadius: 20,
  
    // margin: 6,
  },
  uploadButton: {
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F97701',
    // margin: 30,
    marginTop: 20,
    marginBottom: 10,
    width: responsiveWidth(50),
    borderRadius: 25,
    // borderWidth: 5,
  },
  uploadBtnText: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 40,
    color: '#ffffff',
    fontWeight: 800,
  },

  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(23),
    height: responsiveWidth(25),
    // borderWidth: 1,
    margin: 3,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#F97701',
    height: 20,
    width: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  mediaText: {
    // flex: 1,
    // borderWidth: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadMediaText: {
    fontSize: 15,
    color: 'white',
  },
  btnContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: '#eeeeff',
    width: responsiveWidth(85),
    padding: 50,
    borderRadius: 12,
    // height: responsiveHeight(15),
    marginTop: responsiveHeight(35),
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    padding: 8,
    backgroundColor: '#1E283A',
    borderRadius: 16,
  },
  uploadBtnContainer: {
    width: responsiveWidth(99),
    marginLeft: -45,
    marginTop: -20,
    alignSelf: 'center',
  },
  textOne: {
    marginTop: 10,
    marginBottom: 10,
  },
});
