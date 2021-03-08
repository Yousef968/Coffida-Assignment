import React, {Component} from 'react';
import {View,ToastAndroid,  StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container,  Button, Text } from 'native-base';


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
      <Container style={styles.container} >
        <Text style={styles.text}>
          User Management
        </Text>

        <View style={styles.space} />
        <Button
          onPress={() => navigation.navigate('Sign Up')}
          block style={{backgroundColor: 'red' , width:'100%'}} >
          <Text>Sign up</Text>

          </Button>
          
        
              <View style={styles.space} />

        
        <Button block style={{backgroundColor: 'red' , width:'100%'}}
         onPress={() => navigation.navigate('Login')} >
           <Text>Login</Text>
         </Button>
        <View style={styles.space} />

        <Button
          block style={{backgroundColor: 'red' , width:'100%'}}
          onPress={() => navigation.navigate('GetUserInfo')} >
            <Text>Get user information</Text>
          </Button>
        
                <View style={styles.space} />

        <Button 
        block style={{backgroundColor: 'red' , width:'100%'}}
         onPress={() => this.logout()} >
           <Text>Logout</Text>
         </Button>
        
      </Container>
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
