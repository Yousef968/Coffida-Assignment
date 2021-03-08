import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';

class FavouriteALocation extends Component {
  constructor(props) {
    super(props);
  }

  unfavLoc = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;

    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/favourite',
      {
        method: 'delete',
        headers: {
          'X-Authorization': value,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          console.log('Location unfavourited');
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 403) {
          throw 'Forbidden';
        } else if (response.status === 404) {
          throw 'Not Found';
        } else if (response.status === 500) {
          throw 'Server Error';
        }
      })
      .then(async () => {
        this.setState({
          isLoading: false,
        });
        ToastAndroid.show('Location unfavourited', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };

  favLoc = async () => {
    //Validation Here
    const value = await AsyncStorage.getItem('@session_token');
    const loc_id = this.props.route.params.loc_id;

    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/favourite',
      {
        method: 'post',
        headers: {
          'X-Authorization': value,
        },
      },
    )
      .then((response) => {
        if (response.status === 200) {
          console.log('Location favourited');
        } else if (response.status === 400) {
          throw 'Bad request';
        } else if (response.status === 401) {
          throw 'Unauthorised';
        } else if (response.status === 404) {
          throw 'Not Found';
        } else if (response.status === 500) {
          throw 'Server Error';
        }
      })

      .then(async () => {
        this.setState({
          isLoading: false,
        });
        ToastAndroid.show('Location favourited', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 100}} />
        <Button
          style={{alignSelf: 'center'}}
          icon={<Icon name="heart" size={20} color="white" />}
          title=" (Favourite this location)"
          onPress={() => this.favLoc()}
        />

        <View style={{height: 100}} />
        <Button
          style={{alignSelf: 'center'}}
          icon={<FontAwesome5 name="heart-broken" size={20} color="white" />}
          title="   (Unfavourite this location)"
          onPress={() => this.unfavLoc()}
        />
      </View>
    );
  }
}

export default FavouriteALocation;
