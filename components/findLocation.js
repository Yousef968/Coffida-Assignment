import React, {Component} from 'react';
import {Text, View, Button, ToastAndroid, Alert, ActivityIndicator,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class findLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
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
    
    return fetch('http://10.0.2.2:3333/api/1.0.0/find' , {
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
          listData: responseJson
        });
        ToastAndroid.show('User info out!!', ToastAndroid.SHORT);
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
        
        <View>
           <Button title="Get Info" onPress={() => this.getInfo()} />
           <FlatList
          data = {this.state.listData}
          renderItem={({item}) => (
            <View>
           <Text>
               
               Location ID : {item.location_id} ,
               Location name : {item.location_name} , 
           Location town : {item.location_town}  , 
           Latitude : {item.latitude} , 
           Longitude : {item.longitude} ,
           Photo : {item.photo_path} , 
           Overall Rating: {item.avg_overall_rating} ,
        Avg Price Rating : {item.avg_price_rating} ,
        Avg Quality Rating : {item.avg_quality_rating} ,
        Avg Cleanliness Rating :  {item.avg_cleanliness_rating}
            </Text>

            </View>
          )}
          keyExtractor ={(item, index) => item.location_id.toString()}
          />
           

         

        </View>
      );
    }
  }
}

export default findLocation;
