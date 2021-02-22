import React, {Component} from 'react';
import {Text, View,ToastAndroid, Alert, ActivityIndicator,  FlatList,  ScrollView,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';


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
      //  ToastAndroid.show("You need to be logged in to view this page",ToastAndroid.LONG);
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  getInfo = async () => {
    //Validation Here
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
        } else {
          throw 'Something went wrong';
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
    const navigation = this.props.navigation;
    const data = this.state.userData;
    const myMap = new Map(Object.entries(data));

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
<View style={{ flex:1, width: '100%'}}>


           <Button title="Add review for this location"
            onPress={() =>
              this.props.navigation.navigate('Add review', {
                loc_id: myMap.get('location_id'),
              })
            }
          />

          <Text style={{fontSize: 22, color: 'black'}}>
            Location
          </Text>

            <Text>
            {'\n'}Location_ID: {myMap.get('location_id')}
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
          <Text style={{fontSize: 22, color: 'black'}}>
            Reviews
            </Text>
            
            <FlatList
          data = {this.state.userData.reviews}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("HandleReviews", {rev_id: item.review.review_id})} >
           <Text>Review ID: {item.review.review_id}             </Text>

           </TouchableOpacity>
           <Text>Overall rating: {item.review.overall_rating} </Text>
           <Text>Price rating: {item.review.price_rating} </Text>
           <Text>Quality rating: {item.review.quality_rating} </Text>
           <Text>Clenliness rating: {item.review.clenliness_rating} </Text>
           <Text>Review body: {item.review.review_body} </Text>
           <Text>Likes rating: {item.review.likes} </Text>
           </View>
            )}
          keyExtractor ={(item) => item.review.review_id.toString()}          />
        
          


          

        </View>
      );
    }
  }
}

export default getSingleLocation;
