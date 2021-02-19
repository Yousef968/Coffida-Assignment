import React, {Component} from 'react';
import {Text, View, Button, ToastAndroid, Alert, ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

class GetUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      userData: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
      this.getInfo();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value === null) {
      Alert.alert('Redirected to login page');
      Alert.alert('You need to be logged in to view this page');
      //  ToastAndroid.show("You need to be logged in to view this page",ToastAndroid.LONG);
      this.props.navigation.navigate('Login');
    } else{
      this.setState({
        isLoading: false
      })
    }
  }


  getInfo = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@user_id');
    console.log(id);
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
      headers: {
        'X-Authorization': value, 
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else {
          throw 'Something went wrong';
        }
      })

      .then(async (responseJson) => {
        this.setState({
          isLoading: false,
          userData: responseJson       
        });
        ToastAndroid.show('User info out!!', ToastAndroid.SHORT);
        console.log(this.state.userData);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };

  render() {
   const data = this.state.userData;
   const data1= Object.values(data);
   let r = new Map(Object.entries(data));
   console.log(r);
   

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        
        <View>
          <Text style={{fontSize:22,color: 'red'}}>
Click on the details you wish to update!
{"\n"}
          </Text>
         
         
       <Text> User ID:{r.get("user_id")}</Text>
       
       <TouchableOpacity onPress={() => this.props.navigation.navigate("updateFname")} >
       <Text> First name : {r.get("first_name")}</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.props.navigation.navigate("updateLname")} >
       <Text> Last name : {r.get("last_name")}</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.props.navigation.navigate("updateEmail")} >
       <Text> Email : {r.get("email")}</Text>
       </TouchableOpacity>
       <Button title="Update Password" onPress={() => this.props.navigation.navigate("updatePassword")} />


         
      
         

        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
container: {
  flex:1,
},
text: {
  fontSize: 34,
  fontWeight: 'bold',
},
});

export default GetUserInfo;
