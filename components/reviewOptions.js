import React, {Component} from 'react';
import {Text, View, Button, ToastAndroid, Alert, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class reviewOptions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true
    }
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
       ToastAndroid.show("You need to be logged in to view this page",ToastAndroid.LONG);
      this.props.navigation.navigate('Login');
    } else{
      this.setState({
        isLoading: false
      })
    }
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
          <Text>This is P3</Text>
          <Button
          title="Add Review"
          onPress={() => navigation.navigate('Add review')}
        />
        <Button
          title="Update Review"
          onPress={() => navigation.navigate('Sign Up')}
        />
        <Button
          title="Delete Review"
          onPress={() => navigation.navigate('Sign Up')}
        />
       
  
          <Button title="Go home" onPress={() => navigation.navigate('Home')} />
        </View>
      );
    }
  }
}

export default reviewOptions;
