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
import updateUserOption from './components/updateUserOption';
import reviewOptions from './components/reviewOptions';
import getSingleLocation from './components/getSingleLocation';
import updateFname from'./components/updateFname';
import updateLname from './components/updateLname';
import updateEmail from './components/updateEmail';
import updatePassword from './components/updatePassword';
import Search from './components/Search';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class App extends Component {
  constructor(props){
    super(props);
  }
  // Stack screen login in nav container
  // STack screen Location Reviews
  render() {
    return (
      <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="Coffida!" component={TabNav}  />
         
          <Stack.Screen name="Account Management" component={UserManagement}   />
          
          <Stack.Screen name="Sign Up" component={Signup} /> 
    <Stack.Screen name="update first name" component={updateFname} />
    <Stack.Screen name="update last name" component={updateLname} />
    <Stack.Screen name="update email" component={updateEmail} />
    <Stack.Screen name="update password" component={updatePassword} />
          <Stack.Screen name="UpdateUser" component={UpdateUser} />
          <Stack.Screen name="GetUserInfo" component={GetUserInfo} />
          <Stack.Screen name="updateUserOption" component={updateUserOption} />
          <Stack.Screen name="findlocation" component={findLocation} />
          <Stack.Screen name="getSingleLocation" component={getSingleLocation} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Add review" component={AddReview} />

          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
function TabNav(){
  return(
    <Tab.Navigator  drawerType="slide" screenOptions = {{headerShow:true}}  >
      <Tab.Screen name="Home" component={Home} options={{ title: "Home" }}  />
      <Tab.Screen name="Account Management"  component={UserManagement} />
<Tab.Screen name="Login" component={Login} screenOptions= {{headerShow:false}} />
<Tab.Screen name ="UpdateUser" component={UpdateUser} />
<Tab.Screen name ="GetUserInfo" component={GetUserInfo} />
<Tab.Screen name ="findlocation" component={findLocation} />
<Tab.Screen name="LocationReviews" component={LocationReviews} />
    </Tab.Navigator>
  )
}

export default App;
