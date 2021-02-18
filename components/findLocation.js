import React, {Component} from 'react';
import {Text, View, Button, ToastAndroid, Alert, ActivityIndicator,FlatList,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class findLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val:"",
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
  
  getLocInfo = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    
    return fetch('http://10.0.2.2:3333/api/1.0.0/location' + location_id , {
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
        
          
           <Button title="Get Info" onPress={() => this.getInfo()} />

           <FlatList
          data = {this.state.listData}
          renderItem={({item}) => (
            <View>
           <Text>
               
              
               <Button title="Location info" onPress={() => {
                 this.props.navigation.navigate("reviewOptions" , {
                   "myKey" : this.state.val
                 })
               } }
               
               
               
               
               />
               
               <Button title="Get single location" onPress={() => this.getLocInfo()} />
               Location id = {item.location_id}
               {"\n"}
               Location name = {item.location_name} 
               {"\n"}
           Location town = {item.location_town}  
           {"\n"}
           Latitude = {item.latitude} 
           {"\n"}
           Longitude = {item.longitude}
           {"\n"}
           Photo = {item.photo_path} 
           {"\n"}
           Overall Rating = {item.avg_overall_rating} 
           {"\n"}
        Avg Price Rating = {item.avg_price_rating} 
        {"\n"}
        Avg Quality Rating = {item.avg_quality_rating} 
        {"\n"}
        Avg Cleanliness Rating =  {item.avg_cleanliness_rating}
        {"\n"}
        {"\n"}
        Location reviews:
        {"\n"}
        {"\n"}
        Review ID = {item.review_id}
        {"\n"}
        Overall Rating = {item.overall_rating}
        {"\n"}
        Price Rating = {item.price_rating}
        {"\n"}
        Quality Rating = {item.quality_rating}
        {"\n"}
        Cleanliness Rating = {item.cleanliness_rating}
        {"\n"}
        Review body = {item.review_body}
        {"\n"}
        Likes = {item.likes}
        {"\n"}




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
