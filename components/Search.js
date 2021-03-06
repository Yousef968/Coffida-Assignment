import React, {Component , useState} from 'react';
import { Text,View,ToastAndroid, ActivityIndicator, FlatList,  Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import { Rating, AirbnbRating , Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      query: '',
      overall_rating: 0,
      price_rating:0,
      quality_rating:0,
      clenliness_rating:0,
      PickerValue:'',
      listData:[],
    };
  }


  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
      console.log(this.state.query);
      console.log("Overall rating",this.state.overall_rating);
      console.log("Price rating",this.state.price_rating);
      console.log("Quality rating",this.state.quality_rating);
      console.log("Clen rating",this.state.clenliness_rating);
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

  

    if (this.state.query != '') {
      url += 'q=' + this.state.query + '&';
      console.log(this.state.query);
    }
    
    if (this.state.overall_rating > 0) {
      url += "overall_rating=" + this.state.overall_rating + "&";
      console.log(this.state.overall_rating);
    }
    if (this.state.price_rating > 0) {
      url += 'price_rating=' + this.state.price_rating + '&';
      console.log(this.state.price_rating);
    }
    if (this.state.quality_rating > 0) {
      url += 'quality_rating=' + this.state.quality_rating + '&';
      console.log(this.state.quality_rating);
    }
    if (this.state.clenliness_rating > 0) {
      url += 'clenliness_rating=' + this.state.clenliness_rating + '&';
      console.log(this.state.clenliness_rating);
    }
   
  
    this.GetSearchInfo(url);
    
  };

  ratingCompleted(rating,name){
    console.log(rating,name);
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
        <View style={{flex:1}}>
          
          <Text style={{fontSize: 20, color: 'black' , textAlign: 'center'}}>Search</Text>
          <TextInput
            placeholder="Enter your search"
            value={this.state.query}
            onChangeText={(query) => this.setState({query: query})}
            style={{padding: 5, borderWidth: 1, margin: 5}}
          />
<Text style={{fontSize: 20, color: 'black' , textAlign: 'center'}}>Overall Rating</Text>          
<AirbnbRating
          size={15}
          defaultRating={0}

          onFinishRating={(rating) => this.ratingCompleted(rating, "overall_rating")} 
          />
<Text style={{fontSize: 20, color: 'black' , textAlign: 'center'}}>Price Rating</Text>          
<AirbnbRating
          size={15}
          defaultRating={0}
          onFinishRating={(rating) => this.ratingCompleted(rating, "price_rating")} 
          />
<Text style={{fontSize: 20, color: 'black' , textAlign: 'center'}}>Quality Rating</Text>          
<AirbnbRating
          size={15}
          defaultRating={0}
          onFinishRating={(rating) => this.ratingCompleted(rating, "quality_rating")} 
          />
<Text style={{fontSize: 20, color: 'black' , textAlign: 'center'}}>Clenliness Rating</Text>         
 <AirbnbRating
          size={15}
          defaultRating={0}
          onFinishRating={(rating) => this.ratingCompleted(rating, "clenliness_rating")} 
          />
          
          <Button title="Search" onPress={() => this.Search()} />
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
