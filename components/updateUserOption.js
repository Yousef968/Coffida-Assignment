import React, {Component} from 'react';
import {View, Button, StyleSheet, } from 'react-native';


class updateUserOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
   
    };
  }

  

 
  render() {


  
      return (
        
        <View>
         <Button title="Update User" onPress={() => this.props.navigation.navigate("UpdateUser")} />
      
         
      
         

        </View>
      );
    
  }
}
const styles = StyleSheet.create({
container: {
  flex:1,
},
text: {
  fontSize: 24,
  fontWeight: 'bold',
},
});

export default updateUserOption;
