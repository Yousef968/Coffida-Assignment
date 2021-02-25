import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import Home from './components/home';
import UserManagement from './components/usermanagement';
import LocationReviews from './components/location-reviews';
import Signup from './components/signup';
import Login from './components/login';
import GetUserInfo from './components/getUserInfo';
import AddReview from './components/addreview';
import findLocation from './components/findLocation';
import getSingleLocation from './components/getSingleLocation';
import updateFname from'./components/updateFname';
import updateLname from './components/updateLname';
import updateEmail from './components/updateEmail';
import updatePassword from './components/updatePassword';
import Search from './components/Search';
import HandleReviews from './components/HandleReviews';
import usersReviews from './components/usersReviews';
import favLocations from './components/favLocations';
import updateOverallrating from './components/updateOverallrating';
import updatePricerating from './components/updatePricerating';
import updateQualityrating from './components/updateQualityrating';
import updateClenrating from './components/updateClenrating';
import updateRevbody from './components/updateRevbody';
import HandlePhotos from './components/HandlePhotos';
import favLocationReviews from './components/favLocationReviews';

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
    <Stack.Screen name="update first name" component={updateFname} options={{ title: 'Update first name' }}/>
    <Stack.Screen name="update last name" component={updateLname} options={{ title: 'Update last name' }}/>
    <Stack.Screen name="update email" component={updateEmail} options={{ title: 'Update email' }} />
    <Stack.Screen name="update password" component={updatePassword} options={{ title: 'Update password' }}/>
          <Stack.Screen name="GetUserInfo" component={GetUserInfo} />
          <Stack.Screen name="findlocation" component={findLocation} options={{ title: 'Find locations' }}/>
          <Stack.Screen name="getSingleLocation" component={getSingleLocation} options={{ title: 'Get a single location' }}/>
          <Stack.Screen name="Search" component={Search} options={{ title: 'Filter search' }} />
          <Stack.Screen name="Add review" component={AddReview} options={{ title: 'Add a review' }}/>
          <Stack.Screen name="LocationReviews" component={LocationReviews} options={{ title: 'Locations and Reviews' }} />
          <Stack.Screen name="HandleReviews" component={HandleReviews} options={{ title: 'Locations and Reviews' }} />
          <Stack.Screen name="usersReviews" component={usersReviews} options={{ title: 'Locations and Reviews' }} />
          <Stack.Screen name="favLocations" component={favLocations} options={{ title: 'Favourite locations' }} />
          <Stack.Screen name="updateOverallrating" component={updateOverallrating} options={{ title: 'Update overall rating' }} />
          <Stack.Screen name="updatePricerating" component={updatePricerating} options={{ title: 'Update price rating' }} />
          <Stack.Screen name="updateQualityrating" component={updateQualityrating} options={{ title: 'Update quality rating' }} />
          <Stack.Screen name="updateClenrating" component={updateClenrating} options={{ title: 'Update cleanliness rating' }} />
          <Stack.Screen name="updateRevbody" component={updateRevbody} options={{ title: 'Update review body' }} />
          <Stack.Screen name="HandlePhotos" component={HandlePhotos} options={{title: 'Photo'}} />
          <Stack.Screen name="favLocationReviews" component={favLocationReviews} options={{title: 'LOL'}} />




          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
function TabNav(){
  return(
    <Tab.Navigator  drawerType="slide" screenOptions = {{headerShow:true}}  >
      <Tab.Screen name="Home" component={Home}   
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={'black'} size={23} />
          ),
        }}
        />




      <Tab.Screen name="Account Management"  component={UserManagement} 
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="account" color={'black'} size={25} />
        ),
      }}
      />





<Tab.Screen name="Login" component={Login} screenOptions= {{headerShow:false}} 
   options={{
    tabBarLabel: 'Login',
    tabBarIcon: () => (
      <SimpleLineIcons name="login" color={'black'} size={23} />
    ),
  }}
  />






<Tab.Screen name ="GetUserInfo" component={GetUserInfo} 
options={{
  tabBarLabel: 'Details',
  tabBarIcon: () => (
    <MaterialCommunityIcons name="account-details" color={'black'} size={23} />
  ),
}}
/>



<Tab.Screen name ="findlocation" component={findLocation} 
 options={{
  tabBarLabel: 'Search',
  tabBarIcon: () => (
    <FontAwesome5 name="search-location" color={'black'} size={23} />
  ),
}}
/>





    </Tab.Navigator>
  )
}

export default App;
