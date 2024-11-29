import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {Component, createRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import axios from 'axios';

import MaterailIcons from 'react-native-vector-icons/MaterialIcons';

interface IState {
  apiData: Array<1>;
  isLoader: boolean | null;
  isPostLoader: boolean | null;
  isPutLoader: boolean | null;
  isDeleteLoader: boolean | null;
  isPatchLoader: boolean | null;
}

export default class ApiScreen extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      apiData: [],
      isLoader: false,
      isPostLoader: null,
      isPutLoader: null,
      isDeleteLoader: null,
      isPatchLoader: null,
    };
  }
  onPressGetDataButton = () => {
    this.setState({
      isLoader: true,
      isPostLoader: null,
      isPutLoader: null,
      isDeleteLoader: null,
      isPatchLoader: null,
    });
    setTimeout(async () => {
      const apiCall = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const response = await apiCall.data;
      this.setState({apiData: response});
      this.setState({isLoader: false});
    }, 2000);
  };

  onPressPostDataButton = async () => {
    this.setState({
      isPostLoader: true,
      isDeleteLoader: null,
      isPutLoader: null,
      apiData: [],
      isPatchLoader: null,
    });
    setTimeout(async () => {
      const apiCall = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: 'Ravi kiran',
          body: 'Extended WebApp tech',
          userId: 1,
        },
      );

      const response = apiCall.status;
      if (apiCall.status === 201) {
        this.setState({isPostLoader: false});
      }
    }, 1000);
  };

  onPressPutData = () => {
    this.setState({
      isDeleteLoader: null,
      apiData: [],
      isPostLoader: null,
      isPutLoader: true,
      isPatchLoader: null,
    });
    setTimeout(async () => {
      const apiCall = await axios.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          id: 1,
          title: 'Ravi kiran',
          body: 'Extended WebApp tech',
          userId: 1,
        },
      );

      const response =  apiCall.status;

      if (apiCall.status === 200) {
        this.setState({isPutLoader: false});
      }
    }, 1000);
  };

  onPressDeleteData = async () => {
    this.setState({
      apiData: [],
      isPostLoader: null,
      isPutLoader: null,
      isDeleteLoader: true,
      isPatchLoader: null,
    });
    const apiCall = await axios.delete(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    console.log('97', apiCall.status);
    if (apiCall.status == 200) {
      this.setState({isDeleteLoader: false});
    }
  };

  onPressPatchData = () => {
    this.setState({
      isDeleteLoader: null,
      apiData: [],
      isPostLoader: null,
      isPutLoader: null,
      isPatchLoader: true,
    });
    setTimeout(async () => {
      const apiCall = await axios.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          title: 'Ravi kiran Patil',
        },
      );
      const response = apiCall.status;
      if (apiCall.status === 200) {
        this.setState({isPatchLoader: false});
      }
    }, 1000);
  };

  renderItem = ({item}) => {
    const {title, id, body} = item;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>
          ({item.id}) . {title}
        </Text>
        <Text style={styles.text}>{body}</Text>
      </View>
    );
  };

  onPressBackButton = () => {
    this.props.navigation.navigate('FormScreen');
  };

  render() {
    const {
      apiData,
      isLoader,
      isPostLoader,
      isPutLoader,
      isDeleteLoader,
      isPatchLoader,
    } = this.state;
    return (
      <SafeAreaView>
        <View style={styles.topContainer}>
          <MaterailIcons
            onPress={this.onPressBackButton}
            name="arrow-back-ios"
            size={30}
          />
          <View style={styles.profile}>
            <Text style={styles.profileText}>Profile</Text>
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={this.onPressGetDataButton}>
            <Text style={styles.getData}>Get Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={this.onPressPostDataButton}>
            <Text style={styles.getData}>Post Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={this.onPressPutData}>
            <Text style={styles.getData}>Put Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={this.onPressDeleteData}>
            <Text style={styles.getData}>Delete Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={this.onPressPatchData}>
            <Text style={styles.getData}>Patch Data</Text>
          </TouchableOpacity>
        </View>

        {isLoader ? (
          <>
            <ActivityIndicator />
            {/* <Text>HEllo ravikiran</Text> */}
          </>
        ) : (
          <View>
            <FlatList
              data={apiData}
              renderItem={this.renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        )}

        {isPostLoader === null ? null : isPostLoader === true ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Data Posted Successfully...</Text>
            </View>
          </View>
        )}

        {isPutLoader === null ? null : isPutLoader === true ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Data Updated Successfully...</Text>
            </View>
          </View>
        )}

        {isDeleteLoader === null ? null : isDeleteLoader === true ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Data Deleted Successfully...</Text>
            </View>
          </View>
        )}

        {isPatchLoader === null ? null : isPatchLoader === true ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Data Patched Successfully...</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderWidth: 0.1,
    backgroundColor: '#eeffff',
    borderRadius: 20,
    margin: 5,
  },
  touchable: {
    width: responsiveWidth(30),
    margin: 5,
    padding: 6,
    borderRadius: 15,
    backgroundColor: '#94CD00',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  text: {
    fontSize: 12,
  },
  itemContainer: {
    borderWidth: 1,
    margin: 8,
    padding: 8,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  submitText: {
    fontSize: 20,
    fontWeight: 700,
  },
  getData: {
    textAlign: 'center',
    color: '#ffffff',
  },
  topContainer: {
    flexDirection: 'row',
    margin: 15,
  },

  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: responsiveWidth(30),
 
  },
  profileText: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',
  },
});
//#52C9DE