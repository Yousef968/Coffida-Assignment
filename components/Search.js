import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-elements';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      locations: null,
      query: '',
      overall_rating: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
      //this.getInfo();
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

  GetSearchInfo = async (url) => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch(url, {
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
          listData: responseJson,
        });
        ToastAndroid.show('User info out!!', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };

  Search = () => {
    //Validation Here

    let url = 'http://10.0.2.2:3333/api/1.0.0/find?';

    console.log(this.state.query);
    console.log(this.state.overall_rating);

    if (this.state.query != '') {
      url += 'q=' + this.state.query + '&';
    }
    if (this.state.overall_rating > 0) {
      url += 'overall_ratings' + this.state.overall_rating + '&';
    }
    this.GetSearchInfo(url);
  };

  ratingCompleted(rating,name){
      let stateObject = () => {
          let returnObj = {};
          returnObj[name] = rating;
          return returnObj;
      };
      this.setState(stateObject);
      } 

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
          
          <Text style={{fontSize: 20, color: 'black'}}>Search</Text>
          <TextInput
            placeholder="Enter your search"
            value={this.state.query}
            onChangeText={(query) => this.setState({query: query})}
            style={{padding: 5, borderWidth: 1, margin: 5}}
          />
          <Text>Overall Rating</Text>
          <AirbnbRating
          size={15}
          defaultRating={0}
          onFinishedRating={(rating) => this.ratingCompleted(rating, "overall_rating")} 
          />
          <Button title="Get Info" onPress={() => this.Search()} />
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <View>
                <Text> Location id = {parseInt(item.location_id)} </Text>
                <Text> Location name = {item.location_name}</Text>
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
        </View>
      );
    }
  }
}

export default Search;
