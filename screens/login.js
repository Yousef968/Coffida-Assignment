import React, {Component} from 'react';
import {ToastAndroid, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      email_error:'',
      password_error:'',
    };
  }
  login = async () => {
    if (this.state.email.length == '') {
      this.setState({email_error: "email can't be blank"})
    }
    if (this.state.password.length == '') {
      this.setState({password_error: "password can't be blank"})
    } else {
      return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            throw 'Incorrect email or password';
          } else if (response.status === 500) {
            throw 'Server Error';
          }
        })

        .then(async (responseJson) => {
          console.log('Signed in!', responseJson);
          await AsyncStorage.setItem('@session_token', responseJson.token);
        await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id))
       

          this.props.navigation.navigate('Home');
          ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show('error', ToastAndroid.SHORT);
        });
    }
}
  render() {

    return (
      <View>
        <TextInput
          placeholder="Enter your email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />
        <Text style={{color: 'red'}}> {this.state.email_error}</Text>

        <View style={{height:10}} />
        <TextInput
          placeholder="Enter your password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          style={{padding: 5, borderWidth: 2, margin: 5}}
          secureTextEntry={true}
        />
        <Text style={{color: 'red'}}> {this.state.password_error}</Text>

        <View style={{height:25}} />

        <Button
          block
          style={{backgroundColor: 'red', width: '100%'}}
          onPress={() => this.login()}>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }
}

export default Login;
