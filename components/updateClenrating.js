import React, {Component} from 'react';
import {View, Alert, TextInput, ToastAndroid, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button , Text} from 'native-base';


class updateClenrating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      clenliness_rating: '',
      clen_rating_check:'',
     
      
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
    if(this.state.clenliness_rating==''){
      this.setState({clen_rating_check: "cleanliness rating can't be left empty"})
    }
    else{

    let updateReview = {};

    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
    const rev_id = this.props.route.params.rev_id;
    

    
   
    
    

   
     updateReview.clenliness_rating = parseInt(this.state.clenliness_rating);
     



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
  }
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
          <Text style={{textAlign:'center'}} >Update cleanliness rating</Text>

          <TextInput
            placeholder="Enter cleanliness rating..."
            onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
            value={this.state.clenliness_rating}
            keyboardType="numeric"
            style={{padding: 5, borderWidth: 2, margin: 5}}
          />
                          <Text style={{color:'red'}} > {this.state.clen_rating_check}</Text>

         
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

export default updateClenrating;
