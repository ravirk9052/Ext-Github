import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
  Formscreen: undefined;
  PersonalInfo: {userData: any}; // Example of passing a `userData` parameter
};

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Formscreen'>;
  // route: RouteProp<RootStackParamList, 'Formscreen'>;
  // params: RouteProp<RootStackParamList, 'Formscreen'>;
};

import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterailIcons from 'react-native-vector-icons/MaterialIcons';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default class PersonalInfo extends Component<Props> {
  onPressbackButton = () => {
    this.props.navigation.navigate('Formscreen');
  };

  render() {
    // console.log('11',this.props.navigation);
    const {firstName, lastName, emailId, mobile, imageUrl} =
      this.props.route.params?.userData;
    // console.log('26', firstName, lastName, emailId, mobile, imageUrl);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <View style={styles.topContainer}>
          <MaterailIcons name="arrow-back-ios" size={30} />
          <View style={styles.profile}>
            <Text style={styles.profileText}>Profile</Text>
          </View>
          {/* <Text style={styles.profileText}>Profile</Text> */}
        </View>
        <View style={styles.imgContainer}>
          <View>
            <Image style={styles.image} source={{uri: imageUrl}} />
            <TouchableOpacity
              style={styles.pencilIconContainer}
              // onPress={this.onPressPickImage}
            >
              <SimpleLineIcons name="pencil" size={20} />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.product}>Executive - Product</Text>
          <View style={styles.iconGroup}>
            <View style={styles.iconNumberGroup}>
              <FontAwesome
                style={styles.icon}
                color="green"
                name="thumbs-o-up"
                size={30}
              />
              <Text style={styles.textNumber}>1</Text>
            </View>
            <View style={styles.iconNumberGroup}>
              <FontAwesome
                style={styles.icon}
                color="red"
                name="thumbs-o-down"
                size={30}
              />
              <Text style={styles.textNumber}>1</Text>
            </View>
            <View style={styles.iconNumberGroup}>
              <SimpleLineIcons
                style={styles.icon}
                color="blue"
                name="badge"
                size={30}
              />
              <Text style={styles.textNumber}>3</Text>
            </View>
          </View>
        </View>
        {/* <Text>PersonalInfo</Text>
        <TouchableOpacity onPress={this.onPressbackButton}>
          <Text>Back</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View>
            <Text>Personal Info</Text>
            <TouchableOpacity
              style={styles.pencilIconContainer}
              // onPress={this.onPressPickImage}
            >
              <SimpleLineIcons name="pencil" size={20} />
            </TouchableOpacity>

          </View> */}
        {/* </View> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    backgroundColor: '#ffffff',
    margin: 15,
  },

  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    //  borderWidth: 1,
    alignSelf: 'center',
    marginLeft: responsiveWidth(30),
    //  textAlign:'center'
  },
  profileText: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 30,
   
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'orange',

  },
  name: {
    fontSize: 25,
    fontWeight: 700,
    margin: 10,
  },
  product: {
    fontSize: 15,
    fontWeight: 600,
    // margin: 5,
    color: '#82C7F9',
  },
  iconNumberGroup: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGroup: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    justifyContent: 'space-around',

    padding: 10,
  },
  textNumber: {
    fontWeight: 700,
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    padding: 10,
    // borderWidth: 0.1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // padding: 12,
    borderRadius: 50,
  },
  pencilIconContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    borderWidth: 0.1,
    backgroundColor: '#ffffff',
    padding: 6,
    borderRadius: 50,
  },
});
