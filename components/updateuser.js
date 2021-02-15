import React, {Component} from 'react';
import {View, Text, Button, Alert, TextInput, ToastAndroid, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      orig_first_name: '',
      orig_last_name: '',
      orig_email: '',
      orig_password: '',

      first_name: '',
      last_name: '',
      email: '',
      password: '',
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

  updateItem = async () => {
    let to_send = {};

    const value = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@user_id');

    //  let to_send = {};

    if (this.state.first_name != this.state.orig_first_name) {
      to_send.first_name = this.state.first_name;
    }

    if (this.state.last_name != this.state.orig_last_name) {
      to_send.last_name = this.state.last_name;
    }

    if (this.state.email != this.state.orig_email) {
      to_send.email = parseInt(this.state.email);
    }

    if (this.state.password != this.state.orig_password) {
      to_send.password = parseInt(this.state.password);
    }

    //  console.log(to_send);

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
          <TextInput
            placeholder="Enter last name"
            onChangeText={(last_name) => this.setState({last_name})}
            value={this.state.last_name}
            style={{padding: 5, borderWidth: 1, margin: 5}}
          />
          <TextInput
            placeholder="Enter email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            style={{padding: 5, borderWidth: 1, margin: 5}}
          />
          <TextInput
            placeholder="Enter password..."
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            style={{padding: 5, borderWidth: 1, margin: 5}}
          />
          <Button title="Update" onPress={() => this.updateItem()} />
        </View>
      );
    }
  }
}

export default UpdateUser;
