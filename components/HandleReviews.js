import React, {Component} from 'react';
import {View, StyleSheet,  Text, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';



class HandleReviews extends Component {
  constructor(props) {
    super(props);
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
      //  ToastAndroid.show("You need to be logged in to view this page",ToastAndroid.LONG);
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };
  deleteReview = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
    const rev_id = this.props.route.params.rev_id;
    

    

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+ loc_id + '/review' + rev_id, 
      {
        method: 'delete',
        headers: {
          'X-Authorization': value,
        },
        
      })
      .then((response) => {
        if (response.status === 201) {
            console.log("Deleted the review");
        } else if (response.status === 400) {
          throw 'Failed Validation';
        } else {
          throw 'Something went wrong';
        }
      })
      .then(async () => {
        ToastAndroid.show('Deleted your review', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };
  

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           Coffida App</Text>
<View style={styles.space} />
        <Button 
          title="Update this review"
          type="solid"
          
          onPress={() => navigation.navigate('Account Management')}
        />
        <View style={styles.space} />
     
        <Button title="Delete this review"
        type="solid"
        onPress={() => this.deleteReview()}  />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: 'pink',
    
  },
  space:{
    height:40,
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  //  justifyContent: 'flex-start',
  },
});

export default HandleReviews;
