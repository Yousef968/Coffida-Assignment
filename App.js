import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import ASMain from './components/async-storage-main';
// import Mess from './components/messy-component';
// import Clean from './components/clean-component';
// import Flex from './components/flex-basic';
// import Flex from './components/flex-elements';
import Home from './components/home';
import UserManagement from './components/usermanagement';
import Page3 from './components/page3';
import Signup from './components/signup';
import Login from './components/login';
import UpdateUser from './components/updateuser';
import GetUserInfo from './components/getUserInfo';
//import Logout from './components/logout';
//import Home from './componenets/home_with_buttons';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Account Management" component={UserManagement} />
          <Stack.Screen name="Page3" component={Page3} />
          <Stack.Screen name="Sign Up" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UpdateUser" component={UpdateUser} />
          <Stack.Screen name="GetUserInfo" component={GetUserInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
