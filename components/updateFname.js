import React, {Component} from 'react';
import {View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class updateFname extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      first_name: '',
     
      
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
    let to_send = {};

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
          <Text>Update user credentials</Text>

          <TextInput
            placeholder="Enter first name"
            onChangeText={(first_name) => this.setState({first_name})}
            value={this.state.first_name}
            style={{padding: 5, borderWidth: 1, margin: 5}}
          />
         
          <Button title="Update" onPress={() => this.updateUser()} />
        </View>
      );
    }
  }
}

export default updateFname;
