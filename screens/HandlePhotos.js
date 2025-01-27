import React, {Component} from 'react';
import {View, Alert, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';



class HandlePhotos extends Component {
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
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };


  takePic = async() => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      this.addPicture(data);

      }
  }

  addPicture = async (data) => {
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
    const rev_id = this.props.route.params.rev_id;
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+ loc_id + '/review/' + rev_id + '/photo', 
      {
        method: 'post',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': value,
        },
        body: data
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Photo added");
        } else if (response.status === 400) {
          throw 'Bad request';
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 404) {
          throw 'Not found';
        } else if (response.status === 500) {
          throw 'Server Error';
        }
      })
      
      .then(async () => {
        console.log('Photo added');
        ToastAndroid.show('Photo added', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };
  deletePic = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;
    const rev_id = this.props.route.params.rev_id;
    

    

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+ loc_id + '/review/' + rev_id + '/photo', 
      {
        method: 'delete',
        headers: {
          'X-Authorization': value,
        },
        
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Photo Deleted');
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
        ToastAndroid.show('Deleted your photo!', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };
  

  
  
  

  render() {

    return (
      <View style={{flex: 1, width: '100%'}}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
          }}
          captureAudio={false}
          />
          <Button
          title="Take photo" 
          onPress= {() => {this.takePic()}} />
        <View style={{height: 5}} />
        <Button title="Delete photo" onPress={() => this.deletePic()} />

        </View>

    );
  }
};
export default HandlePhotos;
