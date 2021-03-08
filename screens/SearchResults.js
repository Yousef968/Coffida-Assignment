import React, {Component} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: '',
    };
  }
  GetSearchInfo = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const url = this.props.route.params.url;
    return fetch(url, {
      headers: {
        'X-Authorization': value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400){
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
        
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };


  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
      this.GetSearchInfo();
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

  

  
 
  render() {

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        <View style={{flex:1}}>
          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <View>
                <Text></Text>
                <Text>Location name: {item.location_name}</Text>
                <Text>Location town: {item.location_town}</Text>
                <Text>Overall rating: {item.avg_overall_rating}</Text>
                <Text>Price rating: {item.avg_price_rating}</Text>
                <Text>Quality rating: {item.avg_quality_rating}</Text>
                <Text>Cleanliness rating: {item.avg_clenliness_rating}</Text>
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
