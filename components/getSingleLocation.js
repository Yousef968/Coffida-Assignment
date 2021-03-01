import React, {Component} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';



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
  unfavLoc = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;

    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/favourite',
      {
        method: 'delete',
        headers: {
          'X-Authorization': value,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          console.log('Location unfavourited');


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
    ToastAndroid.show('Location unfavourited',ToastAndroid.SHORT);
    
  })
  .catch((error) => {
    console.log(error);
    ToastAndroid.show('Error!', ToastAndroid.SHORT);
  });

}


  favLoc = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/favourite' , {
      method: 'post',
      headers: {
        'X-Authorization': value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Location favourited");
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
        ToastAndroid.show('Location favourited',ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
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
    let loc_id = myMap.get('location_id');
    console.log(loc_id);
  
    console.log(this.state.userData);

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
<View style = {{flex:1}} >


           <Button title="Add review for this location"
            onPress={() =>
              this.props.navigation.navigate('Add review', {
                loc_id: myMap.get('location_id'),
              })
            }
          />
          <View style={{marginBottom:10}}></View>
          <Button
           icon={
            <Icon
            name= "heart"
            size={20}
            color="white"
          /> 
        }
          title=" (Favourite this location)"
          onPress={() => this.favLoc()}

          />
          <View style={{marginBottom:10}}></View>
            <Button
            icon={
            <FontAwesome5
            name="heart-broken"
            size={20}
            color="white"
            
            />
            }
          title="   (Unfavourite this location)"
          onPress={() => this.unfavLoc()}
          />
       

          <Text style={{fontSize: 22, color: 'black'}}>
            Location
          </Text>





        




            <Text>
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
          data = {this.state.userData.location_reviews}
          renderItem={({item}) => (
            <View>

                

             <Text>{"\n"}</Text>
             <TouchableOpacity  onPress={() => this.props.navigation.navigate("likeRevs", {rev_id: item.review_id , loc_id: loc_id})} >
             
            
             
                <Text>Overall rating: {item.overall_rating}</Text>
                <Text>Price rating: {item.price_rating}</Text>
                <Text>Quality rating: {item.quality_rating}</Text>
                <Text>Cleanliness rating: {item.clenliness_rating}</Text>
           <Text>Review body: {item.review_body}             </Text>

          
           <Text>Likes: {item.likes} </Text>
           </TouchableOpacity>
       
           
           </View>
            )}
          keyExtractor ={(item) => item.review_id.toString()}      
          
              />
        
          


          

        </View>
      );
    }
  }
}

export default getSingleLocation;
