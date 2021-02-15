import React, {Component} from 'react';
import {Button, ToastAndroid} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      cleanliness_rating: '',
      review_body:'',
    };
  }
  addreview = () => {
    //Validation Here
    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
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
        this.props.navigation.navigate('Login');
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
          onChangeText={(cleanliness_rating) => this.setState({cleanliness_rating})}
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
