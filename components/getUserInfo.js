import React, {Component} from 'react';
import { Text, View,ToastAndroid, Alert,  ActivityIndicator, StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';

class GetUserInfo extends Component {
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

  render() {
    const data = this.state.userData
    const data1 = this.state.reviewData
    const myMap = new Map(Object.entries(data));
    console.log(myMap);


    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
         <View style={styles.container}>
        
          <Text style={{fontSize: 20, color: 'red'}}>
            Click on the user details you wish to update!
            {'\n'}
          </Text>

          <Text> User ID: {myMap.get('user_id')}</Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('update first name')}>
            <Text> First name : {myMap.get('first_name')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('update last name')}>
            <Text> Last name : {myMap.get('last_name')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('update email')}>
            <Text> Email : {myMap.get('email')}</Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <Button
            title="Update Password"
            onPress={() => this.props.navigation.navigate('update password')} />
            <View style={styles.space} />
            <Button 
            title = "Get your fav locations"
            onPress={() => this.props.navigation.navigate('favLocations')} />
            <View style={styles.space} />
                    
                    <Button
            title="Get your reviews"
            onPress={() => this.props.navigation.navigate('usersReviews')} /> 
            

   







            
             
        
          
         



 



          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  text: {
    textAlign:'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  space: {
    height: 40,
 
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: 'pink',
  },
  });

export default GetUserInfo;
