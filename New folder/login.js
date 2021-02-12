import React , {Component} from 'react';
import {Button , ToastAndroid, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      email:"",
      password:""
  }


  }
  login = async () => {
    //Validation Here
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login" , {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }
       else if (response.status ===400){
        throw 'Incorrect email or password';
      }
      else{
        throw 'Something went wrong';
      }

    })

    .then(async (responseJson) => {
      console.log("Signed in!" , responseJson);
      await AsyncStorage.setItem('@session_token' , responseJson.token);
      this.props.navigation.navigate("Page3");
      ToastAndroid.show("Logged in successfully!", ToastAndroid.SHORT);

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }
  render(){
    const navigation = this.props.navigation;

    return(
<View>
        <TextInput
        placeholder="Enter your email"
        onChangeText={(email) => this.setState ({email})}
        value={this.state.email}
        style={{padding:5, borderWidth:1, margin:5}}
        />
        <TextInput
        placeholder="Enter your password"
        onChangeText={(password) => this.setState ({password})}
        value={this.state.password}
        style={{padding:5, borderWidth:1, margin:5}}
        />
        <Button
        title="Login"
        onPress={() =>  this.login()}
        />
        </View>
    );
  }
}

export default Login;
