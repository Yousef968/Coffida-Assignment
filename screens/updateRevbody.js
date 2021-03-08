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


class updateRevbody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      review_body: '',
      review_body_check: '',
      review_body_filter: '',
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
    if(this.state.review_body.includes("Tea","tea","cake","cakes","Cakes","Cake","Pastries","Pastry","Pastrys","pastries","pastry","pastrys")){
      this.setState({review_body_filter:"Tea,Cakes or Pastries are not allowed to be in the review body!"})
    }
    else if(this.state.review_body==''){
      this.setState({review_body_check: "review body can't be left blank"})
    } else {
      const value = await AsyncStorage.getItem('@session_token');
      const loc_id = this.props.route.params.loc_id;
      const rev_id = this.props.route.params.rev_id;

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id , {
      method: 'patch',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          } else if (response.status === 400) {
            throw 'Bad Request';
          } else if (response.status === 401) {
            throw 'Unauthorised';
          } else if (response.status === 403) {
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
          console.log("Details changed");

          this.props.navigation.navigate('Home');

          ToastAndroid.show('Details Updated!', ToastAndroid.SHORT);
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    };
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
          <Text style={{textAlign: 'center'}}>Update review body</Text>

          <TextInput
            placeholder="Enter review body..."
            onChangeText={(review_body) => this.setState({review_body})}
            value={this.state.review_body}
            style={{padding: 20, borderWidth: 2, margin: 7}}
          />
                         <Text style={{color:'red'}} > {this.state.review_body_check}</Text>
                         <Text style={{color:'red'}} > {this.state.review_body_filter}</Text>


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
export default updateRevbody;
