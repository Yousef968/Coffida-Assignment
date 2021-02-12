import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          title="Account Mangement"
          onPress={() => navigation.navigate('Account Management')}
        />
        <Button title="Settings" onPress={() => navigation.navigate('Login')} />
        <Button title="Click" onPress={() => navigation.navigate('Page3')} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'forestgreen',
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
});

export default HomeScreen;
