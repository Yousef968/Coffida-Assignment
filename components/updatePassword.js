import React, {Component} from 'react';
import {View, Alert, TextInput, ToastAndroid, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button , Text} from 'native-base';


class updatePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      password: '',
      password_length_check:'',
     
      
    };
  }
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
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
        isLoading:false
    })
  }
};

  updateUser = async () => {
    if(this.state.password.length <5){
      this.setState({password_length_check: "Password has to be greater than 5 characters"})
    }
    else{

    const value = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@user_id');



    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
      method: 'patch',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
         // return response.json();
        } else if (response.status === 400) {
          throw 'Bad Request';
        } else if (response.status === 401) {
          ToastAndroid.show("You're not logged in!", ToastAndroid.SHORT);
        } else {
          throw 'Something went wrong';
        }
      })

      .then(async () => {
        this.setState({
          isLoading: false,
        
        });
          console.log("Details changed");
     
        this.props.navigation.navigate('Home');

           ToastAndroid.show("Details Updated!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };
}

  render() {
    const navigation = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{textAlign:'center'}} > Update password</Text>

          <TextInput
            placeholder="Enter password ..."
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            style={{padding: 5, borderWidth: 2, margin: 5}}
          />
                          <Text style={{color:'red'}} > {this.state.password_length_check}</Text>

         
          <Button
          onPress={() => this.updateUser()} 
          block style={{backgroundColor: 'red' , width:'100%'}} >
            <Text>Update</Text>
          </Button>
        </View>
      );
    }
  }
}

export default updatePassword;
