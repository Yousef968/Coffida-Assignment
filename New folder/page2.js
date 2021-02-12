import React, { Component } from 'react';
import { Text, View, Button, ToastAndroid, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Page2 extends Component{
  constructor(props){
    super(props);

    this.state = {
      email:"",
      password:""
  }


  }
  logout = async () => {
    //Validation Here
  const value =  await AsyncStorage.getItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout" , {
      method: 'post',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json'

      },
    body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }
       else if (response.status ===401){
        throw 'Unauthorised';
      }
      else{
        throw 'Something went wrong';
      }

    })

    .then(async (responseJson) => {
      console.log("Signed out!" , responseJson);
      this.props.navigation.navigate("Home");
    ToastAndroid.show("Logged out!", ToastAndroid.SHORT);

//   Alert.alert(JSON.stringify(responseJson))
//   Alert.alert("Logged out!")



    })
    .catch((error) => {
      console.log(error);
  ToastAndroid.show(error, ToastAndroid.SHORT);
  //Alert.alert(error)

    })
  }




  render(){
    const navigation = this.props.navigation;

    return(
        <View>

          <Button
          title="Sign Up"
          onPress={() => navigation.navigate("Sign Up")}
          />
          <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
          />
          <Button
          title="Logout"
          onPress={() =>  this.logout()}
          />
        </View>
    );
  }
}

export default Page2;
