import React, {Component} from 'react';
import {
  View,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'native-base';

class favLocationReviews extends Component {
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
    const loc_id = this.props.route.params.loc_id;

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id, {
      headers: {
        'X-Authorization': value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 500) {
          throw 'Server Error';
        }
      })

      .then(async (responseJson) => {
        this.setState({
          isLoading: false,
          userData: responseJson,
        });
        ToastAndroid.show(
          'Details for this location revealed',
          ToastAndroid.SHORT,
        );
        console.log(loc_id);
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
          <Text style={{fontSize: 22, color: 'black'}}>Reviews</Text>
          <FlatList
            data={this.state.userData.location_reviews}
            renderItem={({item}) => (
              <View>
                <Text></Text>

                <Text>Overall rating: {item.overall_rating} </Text>
                <Text>Price rating: {item.price_rating} </Text>
                <Text>Quality rating: {item.quality_rating} </Text>
                <Text>Clenliness rating: {item.clenliness_rating} </Text>
                <Text>Review body: {item.review_body} </Text>
                <Text>Likes rating: {item.likes} </Text>
              </View>
            )}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      );
    }
  }
}

export default favLocationReviews;
