import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import ASMain from './components/async-storage-main';
// import Mess from './components/messy-component';
// import Clean from './components/clean-component';
// import Flex from './components/flex-basic';
// import Flex from './components/flex-elements';

import Home from './components/home';
import UserManagement from './components/usermanagement';
import LocationReviews from './components/location-reviews';
import Signup from './components/signup';
import Login from './components/login';
import UpdateUser from './components/updateuser';
import GetUserInfo from './components/getUserInfo';
import AddReview from './components/addreview';
import findLocation from './components/findLocation';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="Home" component={Home} />
         
          <Stack.Screen name="Account Management" component={UserManagement} />
          <Stack.Screen name="LocationReviews" component={LocationReviews} />
          <Stack.Screen name="Sign Up" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UpdateUser" component={UpdateUser} />
          <Stack.Screen name="GetUserInfo" component={GetUserInfo} />
          <Stack.Screen name="Add review" component={AddReview} />
          <Stack.Screen name="findlocation" component={findLocation} />
          
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
