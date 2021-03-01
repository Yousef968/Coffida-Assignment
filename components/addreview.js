import {Item} from 'native-base';
import React, {Component} from 'react';
import {Button, ToastAndroid,Text, Alert} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Filter from 'bad-words';


class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',
      review_body_check:'',
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
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };
  addreview = async () => {
    const filter = new Filter();
    filter.addWords('tea','Tea','cakes','Cakes');
    if(this.state.review_body.includes(filter)){
      Alert.alert("Error");
    }
    if(this.state.review_body==''){
      this.setState({review_body_check: "Review body can't be empty"})
    }
    else{
    let to_send = {};
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
    
     to_send.overall_rating = parseInt(this.state.overall_rating);
     to_send.price_rating = parseInt(this.state.price_rating);
     to_send.quality_rating = parseInt(this.state.quality_rating);
     to_send.clenliness_rating = parseInt(this.state.clenliness_rating);
     to_send.review_body = (this.state.review_body);

    

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+ loc_id + '/review', 
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': value,
        },
        body: JSON.stringify(to_send),
        
      })
      .then((response) => {
        if (response.status === 201) {
        } else if (response.status === 400) {
          throw 'Failed Validation';
        } else {
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log('Response added', responseJson);
        ToastAndroid.show('Response added', ToastAndroid.SHORT);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };
  }
  render() {
    return (
      <ScrollView>
        <TextInput
          placeholder="Enter overall rating"
          onChangeText={(overall_rating) => this.setState({overall_rating})}
          value={this.state.overall_rating}
          keyboardType="numeric"
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />
        <TextInput
          placeholder="Enter price rating"
          onChangeText={(price_rating) => this.setState({price_rating})}
          value={this.state.price_rating}
          keyboardType="numeric"
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />
        <TextInput
          placeholder="Enter quality rating"
          onChangeText={(quality_rating) => this.setState({quality_rating})}
          value={this.state.quality_rating}
          keyboardType="numeric"
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />
        <TextInput
          placeholder="Enter cleanliness rating"
          onChangeText={(clenliness_rating) =>this.setState({clenliness_rating})}
          value={this.state.cleanliness_rating}
          keyboardType="numeric"
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />
        <TextInput
          placeholder="Enter review body"
          onChangeText={(review_body) => this.setState({review_body})}
          value={this.state.review_body}
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />
                        <Text style={{color:'red'}} > {this.state.review_body_check}</Text>

        <Button title="Add review" onPress={() => this.addreview()} />
      </ScrollView>
    );
  }
}

export default AddReview;
