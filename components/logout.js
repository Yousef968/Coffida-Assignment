import React , {Component} from 'react';
import {Button , ToastAndroid, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Logout extends Component{
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
        'X-Authorization': value
      },
    //  body: JSON.stringify(this.state)
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

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
      //Alert.alert("Error")
    })
  }
  render(){
    const navigation = this.props.navigation;

    return(
<View>

        </View>
    );
  }
}

export default Logout;
