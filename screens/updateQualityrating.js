import React, {Component} from 'react';
import {
  View,
  Alert,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from 'native-base';


class updateQualityrating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      quality_rating: '',
      quality_rating_check: '',
      quality_rating_length_check: '',
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
    })
  }
};

  updateRating = async () => {
    if (this.state.quality_rating == '') {
      this.setState({
        quality_rating_check: "quality rating can't be left empty",
      });
    }
    if(this.state.quality_rating>6 || this.state.quality_rating.length>1){
      this.setState({quality_rating_length_check: "Rating can't be more than 5"})
    }
    else{
      let updateReview = {};

      const value = await AsyncStorage.getItem('@session_token');
      const loc_id = this.props.route.params.loc_id;
      const rev_id = this.props.route.params.rev_id;
    
      updateReview.quality_rating = parseInt(this.state.quality_rating);
     



    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id , {
          method: 'patch',
          headers: {
            'X-Authorization': value,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateReview),
        },
      )
        .then((response) => {
          if (response.status === 200) {
          } else if (response.status === 400) {
            throw 'Bad Request';
          } else if (response.status === 401) {
            throw 'Unauthorised';
          } else if (response.status === 403){
            throw 'Forbidden';
          } else if (response.status === 404) {
            throw 'Not found';
          } else if (response.status === 500) {
            throw 'Server Error';
          }
        })

        .then(async () => {
          this.setState({
            isLoading: false,
          });
          console.log('Details changed');

          this.props.navigation.navigate('Home');

          ToastAndroid.show('Details Updated!', ToastAndroid.SHORT);
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }
}

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
          <Text style={{textAlign: 'center'}}>Update quality rating</Text>

          <TextInput
            placeholder="Enter quality rating..."
            onChangeText={(quality_rating) => this.setState({quality_rating})}
            value={this.state.quality_rating}
            keyboardType="numeric"
            style={{padding: 5, borderWidth: 2, margin: 5}}
          />
                         <Text style={{color:'red'}} > {this.state.quality_rating_check}</Text>
                         <Text style={{color:'red'}} > {this.state.quality_rating_length_check}</Text>

          <Button
          onPress={() => this.updateRating()} 
          block style={{backgroundColor: 'red' , width:'100%'}} >
            <Text>Update</Text>
          </Button>
        </View>
      );
    }
  }
}
export default updateQualityrating;
