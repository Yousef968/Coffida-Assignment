import React, {Component} from 'react';
import {StyleSheet, View,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container,  Button, Text } from 'native-base';


class LocationReviews extends Component {
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
        <Container style={{backgroundColor:'pink' }} >

      <View style={{height:50}} />
         
        
        <Button
        block style={{backgroundColor: 'blue' , width:'100%'}}
        onPress={() => this.props.navigation.navigate("findlocation")} >
          <Text>Find locations</Text>
        </Button>

    
  
          
        </Container>
      );
    }
  }
}


export default LocationReviews;
