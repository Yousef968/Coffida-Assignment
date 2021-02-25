import React, {Component} from 'react';
import { Text, View,ToastAndroid, Alert,  ActivityIndicator, ScrollView, TouchableOpacity,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';

class favLocationReviews extends Component {
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
  likeReview = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
    const rev_id = this.props.route.params.rev_id;

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id + '/like', {
      method: 'post',
      headers: {
        'X-Authorization': value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Review liked");
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else {
          throw 'Something went wrong';
        }
      })
      

      .then(async () => {
        this.setState({
          isLoading: false,
          
        });
        ToastAndroid.show('Review liked',ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };
 
  

  render() {

    const myMap = new Map(Object.entries(this.state.userData));
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
        
         

    
            <Text style={{fontSize: 22, color: 'black'}}>
             Reviews 
                </Text>
                <FlatList
          data = {this.state.userData.reviews}
          renderItem={({item}) => (
              <View>
            <View style={{height:5}} />
                <Button
                title="Like this review"
                onPress={() => this.likeReview()} />
                <View style={{height:5}} />
                <Button
                title="Unlike this review"
                onPress={() => this.unlikeReview} />
    
              <TouchableOpacity onPress={() => this.props.navigation.navigate("HandleReviews", {rev_id: item.review.review_id , loc_id: item.location.location_id})} >
           <Text>Review ID: {item.review_id}             </Text>
           

           </TouchableOpacity>
           <Text>Overall rating: {item.review.overall_rating} </Text>
           <Text>Price rating: {item.review.price_rating} </Text>
           <Text>Quality rating: {item.review.quality_rating} </Text>
           <Text>Clenliness rating: {item.review.clenliness_rating} </Text>
           <Text>Review body: {item.review.review_body} </Text>
           <Text>Likes rating: {item.review.likes} </Text>
           





           
            </View>
          )}
          keyExtractor ={(item) => item.review.review_id.toString()}        
            />
          
         



 



          
        </View>
      );
    }
  }
}


export default favLocationReviews;
