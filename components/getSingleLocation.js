import React, {Component} from 'react';
import {Text, View, Button, ToastAndroid, Alert, ActivityIndicator,FlatList,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Thumbnail } from 'native-base';

class getSingleLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {

      isLoading: true,
    location: null,
    location_id: "",
  
  infoData: [],
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
    } else{
      this.setState({
        isLoading: false
      })
    }
  }


  getInfo = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id , {
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
          infoData: responseJson
        });
        ToastAndroid.show('User info out!!', ToastAndroid.SHORT);
        console.log(location_id);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };
  
  

  render() {
    const navigation = this.props.navigation;
    const data = this.state.infoData;
    const myMap = new Map(Object.entries(data));



    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        
        <ScrollView>
        
          
           <Button title="Get Info for single loc" onPress={() => this.getInfo()} />
           <Button title="Add review for this location" onPress={() => this.props.navigation.navigate("Add review", {location_id: myMap.get("location_id")})} />
           <Text style={{fontSize: 22, color: 'black'}}>
             Favourite Locations 
                </Text>
                
              <Text>{"\n"}Location_ID: {myMap.get("location_id")}
              {"\n"}
              Location_Name: {myMap.get("location_name")}
              {"\n"}
              Location_Town: {myMap.get("location_town")}
              {"\n"}
              Latitude: {myMap.get("latitude")}
              {"\n"}
              Longitude: {myMap.get("longitude")}
              {"\n"}
              Photo_Path: {myMap.get("photo_path")}
              {"\n"}
              Avg_Overall_Rating: {myMap.get("avg_overall_rating")}
              {"\n"}
              Avg_Price_Rating: {myMap.get("avg_price_rating")}
              {"\n"}
              Avg_Quality_Rating: {myMap.get("avg_quality_rating")}
              {"\n"}
              Avg_Cleanliness_Rating: {myMap.get("avg_clenliness_rating")}
              {"\n"}
            </Text>
            <Text style={{fontSize:22, color: 'black'}}>
              Location Reviews
            </Text>
            <Text>
            {"\n"}Review_ID: {myMap.get("review_id")}
              {"\n"}
              Overall_Rating: {myMap.get("overall_rating")}
              {"\n"}
              Price_Rating: {myMap.get("price_rating")}
              {"\n"}
              Quality_Rating: {myMap.get("quality_rating")}
              {"\n"}
              Cleanliness_Rating: {myMap.get("clenliness_rating")}
              {"\n"}
              Review_body: {myMap.get("review_body")}
              {"\n"}
              Likes: {myMap.get("likes")}



            </Text>






        
           

         

        </ScrollView>
      );
    }
  }
}

export default getSingleLocation;
