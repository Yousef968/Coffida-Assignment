import React, {Component} from 'react';
import {View, ToastAndroid, Alert, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


class likeRevs extends Component {
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

  likeReview = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
    const rev_id = this.props.route.params.rev_id;
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id + '/like', {
        method: 'post',
        headers: {
          'X-Authorization': value,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          console.log('Review liked');
        } else if (response.status === 400) {
          throw 'Bad request';
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 404) {
          throw 'Not found';
        } else if (response.status === 500){
          throw 'Server Error';
        }
      })

      .then(async () => {
        this.setState({
          isLoading: false,
        });
        ToastAndroid.show('Review liked',ToastAndroid.SHORT);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };

  unlikeReview = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
const rev_id = this.props.route.params.rev_id;
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id + '/like', {
      method: 'delete',
      headers: {
        'X-Authorization': value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Review unliked");
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'Forbidden';
        } else if (response.status === 404){
          throw 'Not Found';
        } else if (response.status === 500) {
          throw 'Server Error';
        }
      })

      .then(async () => {
        this.setState({
          isLoading: false,
        });
        ToastAndroid.show('Review unliked',ToastAndroid.SHORT);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };
  

  render() {
    


    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{height: 20}} />


          <Button
            icon={
              <Icon
                name="thumbs-o-up"
                size={20}
                color="white"
              /> 
            }
            title="  (Like review)"
            onPress={() => this.likeReview()} />
         
            <View style={{height:200}} />
                
                <Button
                icon={
                <Icon
                name="thumbs-o-down"
                size={20}
                color="white"
              /> 
            }
                title="  (Unlike review)"
                onPress={() => this.unlikeReview()} />
 </View>

        
      );
    }
  }
}
export default likeRevs;
