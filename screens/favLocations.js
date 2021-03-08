import React, {Component} from 'react';
import {
  View,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from 'native-base';

class favLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      reviewData: [],
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
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  getInfo = async () => {
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
          return response.json();
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 404) {
          throw 'Not Found';
        } else if (response.status === 500) {
          throw 'Server Error';
        }
      })
      .then(async (responseJson) => {
        this.setState({
          isLoading: false,
          userData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };


  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, width: '100%'}}>



          <Text style={{fontSize: 22, color: 'black'}}>
            Favourite Locations
          </Text>
          <FlatList
            data={this.state.userData.favourite_locations}
            renderItem={({item}) => (
              <View>
                <Button
                  block
                  style={{backgroundColor: 'red', width: '100%'}}
                  onPress={() =>
                    this.props.navigation.navigate('favLocationReviews', {
                      loc_id: item.location_id,
                      rev_id: item.review_id,
                    })
                  }>
                  <Text>Get reviews for this location</Text>
                </Button>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate(
                      'HandleReviews',
                      {loc_id: item.location.location_id},
                      {rev_id: item.review.review_id},
                    )
                  }>
                </TouchableOpacity>
                <Text>Location name: {item.location_name} </Text>
                <Text>Location town: {item.location_town} </Text>
                <Text>Latitude: {item.latitude} </Text>
                <Text>Longitude: {item.longitude} </Text>
                <Text>Photo Path: {item.photo_path} </Text>
                <Text>Avg Overall Rating: {item.avg_overall_rating} </Text>
                <Text>Avg PriceRating: {item.avg_price_rating} </Text>
                <Text>Avg Quality Rating: {item.avg_quality_rating} </Text>
                <Text>
                  Avg Clenliness Rating: {item.avg_clenliness_rating} </Text>

              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()} />

        </View>
      );
    }
  }
}
export default favLocations;
