import {Item} from 'native-base';
import React, {Component} from 'react';
import {Button, ToastAndroid} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      location: null,
      location_id: '',
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',
    };
  }
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
      
     
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
    console.log(this.props);
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
  addreview = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    const location_id = this.props.route.params.location_id;
    

    console.log(this.props);

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review', 
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': value,
        },
        body: JSON.stringify(this.state),
      },
    )
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Failed Validation';
        } else {
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log('User created with ID', responseJson);
        ToastAndroid.show('User created', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <ScrollView>
        <TextInput
          placeholder="Enter overall rating"
          onChangeText={(overall_rating) => this.setState({overall_rating})}
          value={this.state.overall_rating}
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <TextInput
          placeholder="Enter price rating"
          onChangeText={(price_rating) => this.setState({price_rating})}
          value={this.state.price_rating}
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <TextInput
          placeholder="Enter quality rating"
          onChangeText={(quality_rating) => this.setState({quality_rating})}
          value={this.state.quality_rating}
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <TextInput
          placeholder="Enter cleanliness rating"
          onChangeText={(clenliness_rating) =>
            this.setState({clenliness_rating})
          }
          value={this.state.cleanliness_rating}
          style={{padding: 5, borderWidth: 1, margin: 5}}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Enter review body"
          onChangeText={(review_body) => this.setState({review_body})}
          value={this.state.review_body}
          style={{padding: 5, borderWidth: 1, margin: 5}}
        />
        <Button title="Add review" onPress={() => this.addreview()} />
      </ScrollView>
    );
  }
}

export default AddReview;
