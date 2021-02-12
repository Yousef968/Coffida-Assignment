import React, {Component} from 'react';
import {Text, View, Button, ToastAndroid, Alert, ActivityIndicator,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          userData: responseJson,
        });
        ToastAndroid.show('User info out!!', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
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
          <Button title="Get User Information" onPress={() => this.getInfo()} />
          <FlatList
            data={this.state.userData}
            renderItem={({item}) => (
              <View>
                <Text>{responseJson}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      );
    }
  }
}

export default GetUserInfo;
