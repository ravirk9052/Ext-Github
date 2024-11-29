import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Formscreen from './src/Screens/Formscreen';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import PersonalInfo from './src/Screens/PersonalInfo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ApiScreen from './src/Screens/ApiScreen';

type RootStackParamList = {
  Formscreen: undefined;
  PersonalInfo: undefined;
};
const Stack = createNativeStackNavigator();
export default class App extends Component<RootStackParamList> {
  render() {
    return (
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="FormScreen">
            <Stack.Screen name="FormScreen" component={Formscreen} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
            <Stack.Screen name="Apiscreen" component={ApiScreen} />
          
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
    // <View>
    //    <Formscreen />   
    // </View>
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
  },
});
