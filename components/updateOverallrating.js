import React, {Component} from 'react';
import {View, Text, Alert, TextInput, ToastAndroid, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';


class updateOverallrating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      overall_rating: '',
     
      
    };
  }
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
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
    } else{
      this.setState({
        isLoading:false
    })
  }
};

  updateRating = async () => {

    let updateReview = {};

    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
    const rev_id = this.props.route.params.rev_id;
    

    
   
    
    
     updateReview.overall_rating = parseInt(this.state.overall_rating);

   



    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id , {
      method: 'patch',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateReview),
    })
      .then((response) => {
        if (response.status === 200) {
        } else if (response.status === 400) {
          console.log("Overall rating updated")
          throw 'Bad Request';
        } else if (response.status === 401) {
          ToastAndroid.show("You're not logged in!", ToastAndroid.SHORT);
        } else {
          throw 'Something went wrong';
        }
      })

      .then(async () => {
        this.setState({
          isLoading: false,
        
        });
          console.log("Details changed");
     
        this.props.navigation.navigate('Home');

           ToastAndroid.show("Details Updated!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
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
          <Text>Update Overall rating</Text>

          <TextInput
            placeholder="Enter overall rating..."
            onChangeText={(overall_rating) => this.setState({overall_rating})}
            value={this.state.overall_rating}
            style={{padding: 5, borderWidth: 1, margin: 5}}
          />
         
          <Button title="Update" onPress={() => this.updateRating()} />
        </View>
      );
    }
  }
}

export default updateOverallrating;
