import React, {Component} from 'react';
import {Text, View, Button, ToastAndroid, Alert, ActivityIndicator,FlatList,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Thumbnail } from 'native-base';

class findLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      listData: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
      //this.getInfo();
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
    } else{
      this.setState({
        isLoading: false
      })
    }
  }


  getInfo = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    
    return fetch('http://10.0.2.2:3333/api/1.0.0/find' , {
      headers: {
        'X-Authorization': value, 
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else {
          throw 'Something went wrong';
        }
      })

      .then(async (responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson
        });
        ToastAndroid.show('User info out!!', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };
  
  getLocInfo = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    
    return fetch('http://10.0.2.2:3333/api/1.0.0/location' + location_id , {
      headers: {
        'X-Authorization': value, 
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else {
          throw 'Something went wrong';
        }
      })

      .then(async (responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson
        });
        ToastAndroid.show('Info out', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
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
        
          
           <Button title="Get Info" onPress={() => this.getInfo()} />

           <FlatList
          data = {this.state.listData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("getSingleLocation", {location_id: item.location_id})} >
            <View>
               
              
              
               
               
             <Text>  Location id = {parseInt(item.location_id)} </Text>
             <Text> Location name = {item.location_name}</Text>
        




            

            </View>

            </TouchableOpacity>
          )}
          keyExtractor ={(item, index) => item.location_id.toString()}
          />
          <Button title="Filter search" onPress={() => this.props.navigation.navigate("Search")} />
           

         

        </View>
      );
    }
  }
}

export default findLocation;
