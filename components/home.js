import React, {Component} from 'react';
import {View, StyleSheet,  Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';



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
<View style={styles.space} />
        <Button 
          title="Account Mangement"
          type="solid"
          
          onPress={() => navigation.navigate('Account Management')}
        />
        <View style={styles.space} />
     
        <Button title="Locations and Reviews"
        type="solid"
        onPress={() => navigation.navigate('LocationReviews')} />
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

export default HomeScreen;
