import React, {Component} from 'react';
import {Text, View, Button, ToastAndroid, Alert, ActivityIndicator,FlatList,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Thumbnail } from 'native-base';

class getSingleLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {

      isLoading: true,
    location: null,
    location_id: "",
  location_name: "",
  location_town: "",
  latitude: 0,
  longitude: 0,
  photo_path: "",
  avg_overall_rating: 0,
  avg_price_rating: 0,
  avg_quality_rating: 0,
  avg_clenliness_rating: 0,
  infoData: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
     // const location_id = this.props.route.params.location_id;

     
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
    const location_id = this.props.route.params.location_id;
    
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id , {
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
          infoData: JSON.stringify(responseJson)
        });
        ToastAndroid.show('User info out!!', ToastAndroid.SHORT);
        console.log(location_id);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };
  
  

  render() {
    const navigation = this.props.navigation;
    const data = this.state.infoData;


    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        
        <View>
        
          
           <Button title="Get Info for single loc" onPress={() => this.getInfo()} />
           <Button title="Add review for this location" onPress={() => this.props.navigation.navigate("Add review")} />
           <Text>{data}</Text>

        
           

         

        </View>
      );
    }
  }
}

export default getSingleLocation;
