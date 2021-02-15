import React, {Component} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
           Coffida App</Text>
        <Button
          title="Account Mangement"
          onPress={() => navigation.navigate('Account Management')}
        />
        <Button title="Settings" onPress={() => navigation.navigate('Login')} />
        <Button title="Location Reviews" onPress={() => navigation.navigate('LocationReviews')} />
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
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  //  justifyContent: 'flex-start',
  },
});

export default HomeScreen;
