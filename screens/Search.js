import React, {Component} from 'react';
import {Text, View, ToastAndroid, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import {AirbnbRating, Button} from 'react-native-elements';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      query: '',
      overall_rating: 0,
      price_rating: 0,
      quality_rating: 0,
      clenliness_rating: 0,
      limit: '',
      listData: [],
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
        } else if (response.status === 400) {
          throw 'Bad Request';
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 500) {
          throw 'Server Error';
        }
      })

      .then(async (responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson,
        });
        this.props.navigation.navigate("SearchResults" , {url: url})
        
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };

  Search = () => {
    let url = 'http://10.0.2.2:3333/api/1.0.0/find?';

    if (this.state.query != '') {
      url += 'q=' + this.state.query + '&';
    }

    if (this.state.overall_rating > 0) {
      url += 'overall_rating=' + this.state.overall_rating + '&';
    }
    if (this.state.price_rating > 0) {
      url += 'price_rating=' + this.state.price_rating + '&';
    }
    if (this.state.quality_rating > 0) {
      url += 'quality_rating=' + this.state.quality_rating + '&';
    }
    if (this.state.clenliness_rating > 0) {
      url += 'clenliness_rating=' + this.state.clenliness_rating + '&';
    }
    if (this.state.limit != '') {
      url += 'limit=' + this.state.limit + '&';
    }

    this.GetSearchInfo(url);
  };

  ratingCompleted(rating, name) {
    let stateObject = () => {
      let returnObj = {};
      returnObj[name] = rating;
      return returnObj;
    };
    this.setState(stateObject);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <TextInput
            placeholder="Enter your search query"
            value={this.state.query}
            onChangeText={(query) => this.setState({query: query})}
            style={{padding: 3, borderWidth: 2, margin: 5}}
          />
          <TextInput
            placeholder="Enter your limit (number of locations to return)"
            value={this.state.limit}
            onChangeText={(limit) => this.setState({limit: limit})}
            style={{padding: 3, borderWidth: 2, margin: 5}}
            keyboardType= "numeric"
          />
          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
            Overall Rating
          </Text>
          <AirbnbRating
            size={15}
            defaultRating={0}
            onFinishRating={(rating) =>
              this.ratingCompleted(rating, 'overall_rating')
            }
          />
          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
            Price Rating
          </Text>
          <AirbnbRating
            size={15}
            defaultRating={0}
            onFinishRating={(rating) =>
              this.ratingCompleted(rating, 'price_rating')
            }
          />
          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
            Quality Rating
          </Text>
          <AirbnbRating
            size={15}
            defaultRating={0}
            onFinishRating={(rating) =>
              this.ratingCompleted(rating, 'quality_rating')
            }
          />
          <Text style={{fontSize: 18, color: 'black', textAlign: 'center'}}>
            Clenliness Rating
          </Text>
          <AirbnbRating
            size={15}
            defaultRating={0}
            onFinishRating={(rating) =>
              this.ratingCompleted(rating, 'clenliness_rating')
            }
          />

          <Button title="Search" onPress={() => this.Search()} />
        </View>
      );
    }
  }
}

export default Search;
