import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



import Home from './screens/home';
import UserManagement from './screens/usermanagement';
import LocationReviews from './screens/location-reviews';
import Signup from './screens/signup';
import Login from './screens/login';
import GetUserInfo from './screens/getUserInfo';
import AddReview from './screens/addreview';
import findLocation from './screens/findLocation';
import getSingleLocation from './screens/getSingleLocation';
import updateFname from './screens/updateFname';
import updateLname from './screens/updateLname';
import updateEmail from './screens/updateEmail';
import updatePassword from './screens/updatePassword';
import Search from './screens/Search';
import HandleReviews from './screens/HandleReviews';
import usersReviews from './screens/usersReviews';
import favLocations from './screens/favLocations';
import updateOverallrating from './screens/updateOverallrating';
import updatePricerating from './screens/updatePricerating';
import updateQualityrating from './screens/updateQualityrating';
import updateClenrating from './screens/updateClenrating';
import updateRevbody from './screens/updateRevbody';
import HandlePhotos from './screens/HandlePhotos';
import favLocationReviews from './screens/favLocationReviews';
import likeRevs from './screens/likeRevs';
import likedreviews from './screens/likedreviews';
import SearchResults from './screens/SearchResults';
import FavouriteALocation from './screens/FavouriteALocation';
import DisplayAnImage from './screens/viewPhoto';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



class App extends Component {
  constructor(props){
    super(props);
  }
 

  render() {
    return (
      <NavigationContainer >
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
          <Stack.Screen name="likeRevs" component={likeRevs} />
          <Stack.Screen name="likedreviews" component={likedreviews} />
          <Stack.Screen name="SearchResults" component={SearchResults}/>
          <Stack.Screen name="FavouriteALocation" component={FavouriteALocation} options={{title: "Favourite a location"}}/>
<Stack.Screen name = "viewPhoto" component={DisplayAnImage} options={{title: "View photo"}} />




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
