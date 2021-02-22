import React, {Component} from 'react';
import {View,ToastAndroid, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';


class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  logout = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'post',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Signed out!');
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else {
          throw 'Something went wrong';
        }
      })

      .then(async () => {
        await AsyncStorage.removeItem('@session_token');
     //   await AsyncStorage.removeItem('@user_id');
        ToastAndroid.show('Signed out!!', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container} >
        <Text style={styles.text}>
          User Management
        </Text>
        <View style={styles.space} />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Sign Up')}
          
        />
              <View style={styles.space} />

        
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <View style={styles.space} />

        <Button
          title="Get user information"
          onPress={() => navigation.navigate('GetUserInfo')}
        />
                <View style={styles.space} />

        <Button title="Logout" onPress={() => this.logout()} /> 
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  text: {
    textAlign:'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  space: {
    height: 40,
 
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: 'pink',
  },
  });
  

export default UserManagement;
