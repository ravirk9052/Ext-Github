import {
  Button,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, createRef} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import ImagePicker, {openCamera} from 'react-native-image-crop-picker';
import DateInput from '../Components/DateInput';
import DropdownInput from '../Components/DropdownInput';
import MaterailIcons from 'react-native-vector-icons/MaterialIcons';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import RBSheet from 'react-native-raw-bottom-sheet';

interface IState {
  imageUrl: string;
  firstName: string;
  lastName: string;
  emailId: string;
  mobile: string;
  pronounce: string;
  hometown: string;
  address: string;

  errors: {
    firstNameError: string;
    lastNameError: string;
    emailIdError: string;
    mobileError: string;
  };
  onChangeDate: () => void;
}


export default class Formscreen extends Component<IState> {
  firstNameRef = createRef<TextInput>();
  lastNameRef = createRef<TextInput>();
  emailRef = createRef<TextInput>();
  mobileRef = createRef<TextInput>();
  refRBSheet = createRef<typeof RBSheet>();
  refRBSheetForPic = createRef<typeof RBSheet>();
  // refRBSheet = useRef();

  state = {
    imageUrl: '',
    firstName: '',
    lastName: '',
    emailId: '',
    mobile: '',
    dateOfBirth: '',
    education: '',
    pronounce: '',
    hometown: '',
    address: '',
    bloodGroup: '',
    brief: '',
    askme: '',
    errors: {
      firstNameError: '',
      lastNameError: '',
      emailIdError: '',
      mobileError: '',
    },
  };
  onChangeInput = (text: string, name: string) => {
    // console.log(text,name)
    this.setState({[name]: text});
    this.validateFields(name, text);
  };
  validateUserName = (text: string) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx.test(text);
  };

  validatePhoneNumber = (text: string) => {
    const phoneReqEx = /^\d{10}$/;
    return phoneReqEx.test(text);
  };

  validateName = (text: string) => {
    const nameEx = /^(?=.*[A-Z]).{4,}$/;
    return nameEx.test(text);
  };

  validateFields = (name: string, text: string) => {
    const {errors} = this.state;
    // console.log('50', name, text);
    // console.log('51', errors);

    switch (name) {
      case 'firstName':
        errors.firstNameError = this.validateName(text)
          ? ''
          : '* First Name Should have morethan 3 characters & one Upper-case letter';
        break;
      case 'lastName':
        errors.lastNameError = this.validateName(text)
          ? ''
          : '* Last Name Should have morethan 3 characters & one Upper-case letter';
        break;
      case 'emailId':
        errors.emailIdError = this.validateUserName(text)
          ? ''
          : '* Email ID should be Valid';
        break;
      case 'mobile':
        errors.mobileError = this.validatePhoneNumber(text)
          ? ''
          : '* Mobile Number should have 10 characters';
        break;

      default:
        break;
    }

    // console.log('59', this.state.errors);
  };

  onPressPickImage = async () => {
    if (Platform.OS === 'android') {
      this.refRBSheetForPic.current?.open();
    } else {
      const image = await ImagePicker.openPicker({
        cropping: true,
      });
      this.setState({imageUrl: image.path});
    }
  };

  onPressSaveButton = () => {
    // console.log('save data');
    const {firstName, lastName, emailId, mobile, errors} = this.state;

    if (!this.validateName(firstName)) {
      this.firstNameRef.current?.focus();
      this.setState(prevState => ({
        errors: {
          ...prevState,
          firstNameError:
            '* First Name Should have morethan 3 characters & one Upper-case letter',
        },
      }));
    } else if (!this.validateName(lastName)) {
      this.lastNameRef.current?.focus();
      this.setState(prevState => ({
        errors: {
          ...prevState,
          lastNameError:
            '* last Name Should have morethan 3 characters & one Upper-case letter',
        },
      })); // console.log('145 - Last Name Error:', errors);
    } else if (!this.validateUserName(emailId)) {
      this.emailRef.current?.focus();
      this.setState(prevState => ({
        errors: {
          ...prevState,
          emailIdError: '* * Email ID should be Valid',
        },
      }));
      errors.emailIdError = '* Email ID should be Valid'; // Update error message
      // console.log('145 - Email ID Error:', errors);
    } else if (!this.validatePhoneNumber(mobile)) {
      this.mobileRef.current?.focus();
      this.setState(prevState => ({
        errors: {
          ...prevState,
          mobileError: '* Mobile Number should have 10 characters',
        },
      }));
      errors.mobileError = '* Mobile Number should have 10 characters'; // Update error message
    } else {
      this.refRBSheet.current?.open();

      // console.log('158 - Form is valid, State:', this.state);
    }
  };

  onPressSubmitButton = () => {
    // console.log('240',this.state.errors)
    this.refRBSheet.current?.close();
    this.props.navigation.navigate('PersonalInfo', {userData: this.state});
  };

  onPressOpenCameraButton = async () => {
    // console.log('250');
    this.refRBSheetForPic.current?.close();
    if (Platform.OS === 'android') {
      const cameraAccess = await check(PERMISSIONS.ANDROID.CAMERA);
      // console.log('253', cameraAccess);
      if (cameraAccess === RESULTS.BLOCKED) {
        openSettings('application');
        // console.log('258', image);
        // this.setState({imageUrl: image.path});
      } else if (cameraAccess === RESULTS.DENIED) {
        const access = await request(PERMISSIONS.ANDROID.CAMERA);
        // console.log('access', access);
        if (access === RESULTS.GRANTED) {
          const image = await ImagePicker.openCamera({
            cropping: true,
        });
          this.setState({imageUrl: image.path});
        } else {
          openSettings('application');
        }
        // openSettings('application');
      } else {
        const image = await ImagePicker.openCamera({
          cropping: true,
        });

        this.setState({imageUrl: image.path});
      }
    }
  };

  onPressNextPageButton = () => {
    // console.log('230')
    this.props.navigation.navigate('Apiscreen');
  };

  onPressPickImageButton = async () => {
    // console.log('250');
    this.refRBSheetForPic.current?.close();
    if (Platform.OS === 'android') {
      const mediaAccess = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      // console.log('253', mediaAccess);
      if (mediaAccess === RESULTS.BLOCKED) {
        openSettings();
        // const image = await ImagePicker.openPicker({
        //   cropping: true,
        // });
        // console.log('258', image);
        // this.setState({imageUrl: image.path});
      } else if (mediaAccess === RESULTS.DENIED) {
         const access = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        //  console.log('248',access)
         if (access === RESULTS.GRANTED){
          const image = await ImagePicker.openPicker({
          cropping: true,
        });
        // console.log('258', image);
        this.setState({imageUrl: image.path});
         }
      } else {
        const image = await ImagePicker.openPicker({
          cropping: true,
        });
        // console.log('258', image);
        this.setState({imageUrl: image.path});

      }
    }
  };

  handleDateChange = (date: string) => {
    // console.log('121',date)
    this.setState({dateOfBirth: date});
  };

  handleDropdown = (value: string) => {
    this.setState({education: value});
  };

  render() {
    // console.log('35', this.state);
    const {
      imageUrl,
      firstName,
      lastName,
      emailId,
      mobile,
      errors,
      dateOfBirth,
      education,
      pronounce,
      hometown,
      address,
      bloodGroup,
      brief,
      askme,
    } = this.state;
    return (
      <SafeAreaView style={{backgroundColor: '#ffffff'}}>
        <ScrollView>
          <View style={styles.topContainer}>
            <MaterailIcons
              onPress={this.onPressNextPageButton}
              name="arrow-back-ios"
              size={30}
            />
            <View style={styles.profile}>
              <Text style={styles.profileText}>Personal Info</Text>
            </View>
            {/* <Text style={styles.profileText}>Profile</Text> */}
          </View>
          {/* <View style={styles.headerContainer}>
            <Text style={styles.header}>Personal Info</Text>
          </View> */}
          <View style={styles.imageContainer}>
            <View>
              {imageUrl ? (
                <Image style={styles.image} source={{uri: imageUrl}} />
              ) : (
                <View>
                  <Image
                    style={styles.image}
                    source={require('../assets/Images/profileTwo.jpg')}
                  />
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.pencilIconContainer}
              onPress={this.onPressPickImage}>
              <SimpleLineIcons name="pencil" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>First Name *</Text>
            <TextInput
              ref={this.firstNameRef}
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={'grey'}
              value={firstName}
              onChangeText={text => this.onChangeInput(text, 'firstName')}
            />
            {errors.firstNameError && (
              <Text style={styles.errorText}>{errors.firstNameError}</Text>
            )}
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Last Name *</Text>
            <TextInput
              ref={this.lastNameRef}
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={'grey'}
              value={lastName}
              onChangeText={text => this.onChangeInput(text, 'lastName')}
            />
            {errors.lastNameError && (
              <Text style={styles.errorText}>{errors.lastNameError}</Text>
            )}
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Email ID *</Text>
            <TextInput
              ref={this.emailRef}
              style={styles.input}
              placeholder="Email ID"
              placeholderTextColor={'grey'}
              value={emailId}
              onChangeText={text => this.onChangeInput(text, 'emailId')}
            />
            {errors.emailIdError && (
              <Text style={styles.errorText}>{errors.emailIdError}</Text>
            )}
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Preferred Pronounce</Text>
            <TextInput
              style={styles.input}
              placeholder="Preferred Pronounce"
              placeholderTextColor={'grey'}
              value={pronounce}
              onChangeText={text => this.onChangeInput(text, 'pronounce')}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Mobile Number *</Text>
            <TextInput
              ref={this.mobileRef}
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={'grey'}
              value={mobile}
              onChangeText={text => this.onChangeInput(text, 'mobile')}
            />
            {errors.mobileError && (
              <Text style={styles.errorText}>{errors.mobileError}</Text>
            )}
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Home Town</Text>
            <TextInput
              style={styles.input}
              placeholder="Home Town"
              placeholderTextColor={'grey'}
              value={hometown}
              onChangeText={text => this.onChangeInput(text, 'hometown')}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor={'grey'}
              value={address}
              onChangeText={text => this.onChangeInput(text, 'address')}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Blood Group</Text>
            <TextInput
              style={styles.input}
              placeholder="Blood Group"
              placeholderTextColor={'grey'}
              value={bloodGroup}
              onChangeText={text => this.onChangeInput(text, 'bloodGroup')}
            />
          </View>
          <View style={styles.formContainer}>
            <DateInput
              date={dateOfBirth}
              onChangeDate={this.handleDateChange}
            />
          </View>
          <View style={styles.formContainer}>
            <DropdownInput
              value={education}
              onChangeDropDown={this.handleDropdown}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Brief About Me</Text>
            <TextInput
              style={[styles.input, styles.inputTwo]}
              placeholder="Brief About Me"
              placeholderTextColor={'grey'}
              value={brief}
              onChangeText={text => this.onChangeInput(text, 'brief')}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Ask me about/Experience</Text>
            <TextInput
              style={[styles.input, styles.inputTwo]}
              placeholder="Ask me about/Experience"
              placeholderTextColor={'grey'}
              value={askme}
              // multiline
              onChangeText={text => this.onChangeInput(text, 'askme')}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.onPressSaveButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={{flex: 1}}>
              <RBSheet
                ref={this.refRBSheet}
                useNativeDriver={true}
                customStyles={{
                  wrapper: {
                    backgroundColor: 'transparent',
                    height: 200,
                  },
                  container: {
                    height: '25%',
                    borderTopRightRadius: 35,
                    borderTopLeftRadius: 35,
                    backgroundColor: '#f1f1f1',
                  },
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                }}
                customModalProps={{
                  animationType: 'slide',
                  statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                  enabled: false,
                }}>
                <View style={styles.bottomSheet}>
                  <Text style={styles.submitText}>Do you want to Submit ?</Text>
                  <View style={styles.sheetContainer}>
                    {/* <Text style={styles.submitText}>Do you want to Submit ?</Text> */}
                    <TouchableOpacity
                      style={styles.SubmitButton}
                      onPress={this.onPressSubmitButton}>
                      <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton}>
                      <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <YourOwnComponent /> */}
              </RBSheet>
            </View>
          </View>
          <View>
            <View style={{flex: 1}}>
              {/* <Button
                title="OPEN BOTTOM SHEET"
                onPress={() => this.refRBSheet.current.open()}
              /> */}
              <RBSheet
                ref={this.refRBSheetForPic}
                useNativeDriver={true}
                customStyles={{
                  wrapper: {
                    backgroundColor: 'transparent',
                    height: 200,
                  },
                  container: {
                    height: '25%',
                    borderTopRightRadius: 35,
                    borderTopLeftRadius: 35,
                    backgroundColor: '#f1f1f1',
                  },
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                }}
                customModalProps={{
                  animationType: 'slide',
                  statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                  enabled: false,
                }}>
                <View style={styles.bottomSheet}>
                  <Text style={styles.submitText}>Pick Any One ?</Text>
                  <View style={styles.sheetContainer}>
                    {/* <Text style={styles.submitText}>Do you want to Submit ?</Text> */}
                    <TouchableOpacity
                      style={styles.SubmitButton}
                      onPress={this.onPressOpenCameraButton}>
                      <Text style={styles.btnText}>Open Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={this.onPressPickImageButton}>
                      <Text style={styles.btnText}>Pick from Image</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <YourOwnComponent /> */}
              </RBSheet>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 10,
    padding: 10,
    marginBottom: -15,
  },
  text: {
    marginLeft: 5,
    color: '#000000',
    fontWeight: 500,
  },
  input: {
    borderWidth: 0.2,
    borderColor: 'grey',
    borderRadius: 15,
    // margin: 5,
    paddingLeft: 10,
    backgroundColor: '#f1f1f1',
    width: responsiveWidth(90),
    height: 55,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    // borderWidth: 1,
    // borderRadius: 50,
    borderRadius: 1000,
  },
  imageContainer: {
    width: responsiveWidth(25),
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0.1,
    // borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginLeft: 5,
  },
  saveButton: {
    margin: 20,
    marginTop: 25,
    width: responsiveWidth(90),
    backgroundColor: 'orange',
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
  },
  saveText: {
    fontWeight: '700',
    fontSize: 18,

    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
  },
  inputTwo: {
    height: 75,
  },
  headerContainer: {
    // borderWidth: 1,
    alignItems: 'center',
    padding: 10,

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 700,
  },
  pencilIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    borderWidth: 0.1,
    backgroundColor: '#ffffff',
    padding: 6,
    borderRadius: 50,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    // borderWidth: 1,
  },
  sheetContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    // borderWidth: 1,
  },
  SubmitButton: {
    backgroundColor: 'green',
    padding: 6,
    width: responsiveWidth(35),
    borderRadius: 20,
    margin: 2,
    // justifyContent: 'center'
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 6,
    width: responsiveWidth(35),
    borderRadius: 20,
    margin: 2,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
  },
  submitText: {
    fontSize: 20,
    fontWeight: 700,
  },
  topContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    // justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    margin: 15,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    //  borderWidth: 1,
    alignSelf: 'center',
    marginLeft: responsiveWidth(22),
    //  textAlign:'center'
  },
  profileText: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
  },
});
