import React, {Component} from 'react';
import {
  View,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container, Button, Text} from 'native-base';

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
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }


  getInfo = async () => {
    const value = await AsyncStorage.getItem('@session_token');

    return fetch('http://10.0.2.2:3333/api/1.0.0/find' , {
      headers: {
        'X-Authorization': value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 400) {
          throw 'Bad Request';
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 500){
          throw 'Server Error';
        }
      })

      .then(async (responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson,
        });
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

        <Container>




           <FlatList
          data = {this.state.listData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("getSingleLocation", {loc_id: item.location_id , rev_id: item.review_id})} >
            <View>
               <Text></Text>


             <Text style={{fontSize:18, color: 'black'}}>Location name : {item.location_name}</Text>
             <Text style={{fontSize:18, color: 'black'}}>Location town : {item.location_town}</Text>

            </View>

            </TouchableOpacity>
          )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />

          <Button
          block style={{backgroundColor: 'blue' , height:50, marginBottom:10}}
          onPress={() => this.props.navigation.navigate("Search")} >
            <Text>Filter search</Text>
          </Button>

        </Container>
      );
    }
  }
}
export default findLocation;
