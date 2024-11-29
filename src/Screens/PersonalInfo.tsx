import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
  FormScreen: undefined;
  PersonalInfo: {userData: any}; // Example of passing a `userData` parameter
};

type Props = {
  navigation: NavigationProp<RootStackParamList, 'FormScreen'>;
  // route: RouteProp<RootStackParamList, 'Formscreen'>;
  // params: RouteProp<RootStackParamList, 'Formscreen'>;
};

import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterailIcons from 'react-native-vector-icons/MaterialIcons';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native-gesture-handler';

export default class PersonalInfo extends Component<Props> {
  
  onPressbackButton = () => {
    this.props.navigation.navigate('FormScreen');
  };

  render() {

    const {firstName, lastName, emailId, mobile, imageUrl,dateOfBirth,
      education,pronounce,hometown,address,bloodGroup,brief,askme} = this.props.route.params?.userData;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView>
        <View style={styles.topContainer}>
          <MaterailIcons onPress={this.onPressbackButton} name="arrow-back-ios" size={30} />
          <View style={styles.profile}>
            <Text style={styles.profileText}>Profile</Text>
          </View>
        </View>
        <View style={styles.imgContainer}>
          <View>
            <Image style={styles.image} source={{uri: imageUrl}} />
            <TouchableOpacity
              style={styles.pencilIconContainer}
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

        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.personalText}>Personal Info</Text>
            <TouchableOpacity
              style={styles.pencilIconContainer}
            >
              <SimpleLineIcons name="pencil" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>

  
          <View style={styles.content}>
            <Text style={styles.contentName}>First name</Text>
            <Text style={styles.contentText}>{firstName}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentName}>Last name</Text>
            <Text style={styles.contentText}>{lastName}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentName}>Email Id</Text>
            <Text style={styles.contentText}>{emailId}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentName,styles.contentNameBlack]}>Preferred Pronounce</Text>
            <Text style={[styles.contentText,styles.contentTextBlack]}>{pronounce}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentName,styles.contentNameBlack]}>Personal Phone Number</Text>
            <Text style={[styles.contentText,styles.contentTextBlack]}>{mobile}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentName,styles.contentNameBlack]}>Home Town</Text>
            <Text style={[styles.contentText,styles.contentTextBlack]}>{hometown}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentName,styles.contentNameBlack]}>Blood Group</Text>
            <Text style={[styles.contentText,styles.contentTextBlack]}>{bloodGroup}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentName,styles.contentNameBlack]}>Date of Birth</Text>
            <Text style={[styles.contentText,styles.contentTextBlack]}>{dateOfBirth}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentName,styles.contentNameBlack]}>Highest Education</Text>
            <Text style={[styles.contentText,styles.contentTextBlack]}>{education}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentName,styles.contentNameBlack]}>Brief About Me</Text>
            <Text style={[styles.contentText,styles.contentTextBlack]}>{brief}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentName,styles.contentNameBlack]}>Ask me about/Experience</Text>
            <Text style={[styles.contentText,styles.contentTextBlack]}>{askme}</Text>
          </View>
          </View>
        </View>
        </ScrollView>
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
    marginBottom: 6,
  },
  infoContainer: {
    borderWidth: 1,
    // margin: -10,
    padding: 30,
    margin: 20,
    borderRadius: 25,
    borderColor: 'grey',

    backgroundColor: '#f1f1f1',
  },
  personalText: {
    fontSize: 22,
    fontWeight: 700,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginTop: 5,
    width: responsiveWidth(75),
  },
  contentName: {
    color: 'grey',
    fontSize: 18,
    // borderWidth: 1,
    // padding: 2,
    marginLeft: -10,
    width: responsiveWidth(35)
  },
  contentText: {
    marginLeft: 5,
    color: 'grey',
    fontSize: 18,
    // borderWidth: 1,
    width: responsiveWidth(40)
  },
  contentContainer: {
    padding: 10,
    marginTop: 40,
  },
  contentNameBlack: {
    color: '#000000',
  },
  contentTextBlack: {
    color: '#000000',
  }
});
