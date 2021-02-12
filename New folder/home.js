import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

class HomeScreen extends Component{
  render(){
    const navigation = this.props.navigation;

    return(
        <View style={styles.container}>

          <Button
          title="Account Mangement"
          onPress={() => navigation.navigate("Account Management")}
          />
          <Button
          title="Settings"
          onPress={() => navigation.navigate("Page3")}
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'forestgreen'
  },
  text:{
    color: 'white',
    fontSize: 25
  }





});


export default HomeScreen;
