import React, {Component} from 'react';
import {View} from 'react-native';
import { Container,  Button, Text } from 'native-base';


class LocationReviews extends Component {
  constructor(props) {
    super(props);
    
   
  }

 
  


 

  render() {

   
      return (
        <Container style={{backgroundColor:'pink' }} >

      <View style={{height:50}} />
         
        
        <Button
        block style={{backgroundColor: 'blue' , width:'100%'}}
        onPress={() => this.props.navigation.navigate("findlocation")} >
          <Text>Find locations</Text>
        </Button>

    
  
          
        </Container>
      );
    }
  }



export default LocationReviews;
