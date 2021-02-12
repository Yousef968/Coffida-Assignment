import React, { Component } from 'react';
import { Text, View , Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Page3 extends Component{

componentDidMount(){
  this.unsubscribe = this.props.navigation.addListener('focus' , () => {
    this.checkLoggedIn();
  });

}
componentWillUnmount() {
  this.unsubscribe();
}

checkLoggedIn = async () => {
  const value = await AsyncStorage.getItem('@session_token');
  if(value == null){
    this.props.navigation.navigate("Login");
  }
};


  render(){
    const navigation = this.props.navigation;

    return(
        <View>
          <Text>This is P3</Text>
          <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
          />
          <Button
          title="Go home"
          onPress={() => navigation.navigate("Account Management")}
          />
        </View>
    );
  }
}

export default Page3;
