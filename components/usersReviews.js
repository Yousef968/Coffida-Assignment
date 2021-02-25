import React, {Component} from 'react';
import { Text, View,ToastAndroid, Alert,  ActivityIndicator, ScrollView, TouchableOpacity,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';

class usersReviews extends Component {
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
    const id = await AsyncStorage.getItem('@user_id');
    console.log(id);
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
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
          reviewData: responseJson,       
        });
        console.log(this.state.userData);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };
  

  render() {
    const data = this.state.userData
    const data1 = this.state.reviewData
    const myMap = new Map(Object.entries(data));
    console.log(myMap);


    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        <View style={{ flex:1, width: '100%'}}>
           
        
             
            
           

           <Text style={{fontSize:22, color: 'black' }} >
           Reviews
           </Text>
           <FlatList
          data = {this.state.userData.reviews}
          renderItem={({item}) => (
            <View>
            
              <Button title="Add photo to this review" 
              onPress={() => this.props.navigation.navigate("HandlePhotos" , {rev_id: item.review.review_id , loc_id: item.location.location_id})} 
              />
              
        
              <TouchableOpacity onPress={() => this.props.navigation.navigate("HandleReviews", {rev_id: item.review.review_id , loc_id: item.location.location_id})} >
                
                
                <Text>Location name : {item.location.location_name}</Text>
                 </TouchableOpacity>
                <Text>Location town: {item.location.location_town}</Text>
           

           <TouchableOpacity onPress={() => this.props.navigation.navigate("updateOverallrating", {rev_id: item.review.review_id , loc_id: item.location.location_id})} >
           <Text>Overall rating: {item.review.overall_rating} </Text>
           </TouchableOpacity>
           
           <TouchableOpacity onPress={() => this.props.navigation.navigate("updatePricerating", {rev_id: item.review.review_id , loc_id: item.location.location_id})} >
           <Text>Price rating: {item.review.price_rating} </Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => this.props.navigation.navigate("updateQualityrating", {rev_id: item.review.review_id , loc_id: item.location.location_id})} >
           <Text>Quality rating: {item.review.quality_rating} </Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => this.props.navigation.navigate("updateClenrating", {rev_id: item.review.review_id , loc_id: item.location.location_id})} >
           <Text>Clenliness rating: {item.review.clenliness_rating} </Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => this.props.navigation.navigate("updateRevbody", {rev_id: item.review.review_id , loc_id: item.location.location_id})} >
           <Text>Review body: {item.review.review_body} </Text>
           </TouchableOpacity>
           <Text>Likes rating: {item.review.likes} </Text>
           </View>
            )}
          keyExtractor ={(item) => item.review.review_id.toString()}          />
           





           
            </View>
         
          
         



 



          
        
      );
    }
  }
}


export default usersReviews;
