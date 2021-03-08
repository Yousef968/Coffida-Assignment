import React, {Component} from 'react';
import {
  View,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from 'native-base';

class getSingleLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      location: null,
      location_id: '',

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
    const myMap = new Map(Object.entries(this.state.userData));
    let loc_id = myMap.get('location_id');

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <Button
              block
              style={{backgroundColor: 'blue', width: '100%'}}
              onPress={() =>
                this.props.navigation.navigate('Add review', {
                  loc_id: myMap.get('location_id'),
                })
              }>
              <Text>Add review for this location</Text>
            </Button>
          </View>

          <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
            Location
          </Text>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('FavouriteALocation', {
                loc_id: loc_id,
              })
            }>
            <Text style={{fontSize: 13.75}}>
              {'\n'}
              Location_Name: {myMap.get('location_name')}
              {'\n'}
              Location_Town: {myMap.get('location_town')}
              {'\n'}
              Latitude: {myMap.get('latitude')}
              {'\n'}
              Longitude: {myMap.get('longitude')}
              {'\n'}
              Photo_Path: {myMap.get('photo_path')}
              {'\n'}
              Avg_Overall_Rating: {myMap.get('avg_overall_rating')}
              {'\n'}
              Avg_Price_Rating: {myMap.get('avg_price_rating')}
              {'\n'}
              Avg_Quality_Rating: {myMap.get('avg_quality_rating')}
              {'\n'}
              Avg_Cleanliness_Rating: {myMap.get('avg_clenliness_rating')}
              {'\n'}
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
            Reviews
          </Text>

          <FlatList
            data={this.state.userData.location_reviews}
            renderItem={({item}) => (
              <View>
                <Text></Text>

                <Text style={{fontSize: 15}}>
                  Overall rating: {item.overall_rating}{' '}
                </Text>
                <Text style={{fontSize: 15}}>
                  Price rating: {item.price_rating}
                </Text>
                <Text style={{fontSize: 15}}>
                  Quality rating: {item.quality_rating}
                </Text>
                <Text style={{fontSize: 15}}>
                  Cleanliness rating: {item.clenliness_rating}
                </Text>
                <Text style={{fontSize: 15}}>
                  Review body: {item.review_body}{' '}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('likeRevs', {
                      rev_id: item.review_id,
                      loc_id: loc_id,
                    })
                  }>
                  <Text style={{fontSize: 15}}>Likes: {item.likes} </Text>
                </TouchableOpacity>

                <Button
                  block
                  style={{backgroundColor: 'blue', width: '25%'}}
                  onPress={() =>
                    this.props.navigation.navigate('viewPhoto', {
                      rev_id: item.review_id,
                      loc_id: loc_id,
                    })
                  }>
                  <Text style={{fontSize: 10}}>view photo</Text>
                </Button>
              </View>
            )}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      );
    }
  }
}

export default getSingleLocation;
