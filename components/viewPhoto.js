import React, {Component} from 'react';
import { View,Image, StyleSheet, ToastAndroid} from 'react-native';
import { Container,  Button, Text } from 'native-base';

class viewPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoData: [],
    };
  }
  componentDidMount(){
    //  this.getPhoto();
  }

 
  getPhoto =  () => {
    const loc_id = this.props.route.params.loc_id;
    const rev_id = this.props.route.params.rev_id;

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id + '/photo', {
      method: 'GET',
      headers: {
        
      },
    })
      .then((response) => {
        if (response.status === 200) {
            this.setState({
                photoData: response,
            })
          
        } else if (response.status === 404) {
          throw 'Not found';
        } else {
          throw 'Something went wrong';
        }
      })
      

      .then( (responseJson) => {
          

       
        ToastAndroid.show('Photo retrieved!',ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('Error!', ToastAndroid.SHORT);
      });
  };

  


 
   
    
  
   
    
  
  
  render() {
      const loc_id = this.props.route.params.loc_id;
      const rev_id = this.props.route.params.rev_id;

      return (
          <View style={styles.container}>


            <Image style={{width:380, height:600, marginLeft:6}}
            source={{ uri: 'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id + '/photo'

            }}
            />






          </View>
        

          
        
           

         


      );
    
  }
}

const styles = StyleSheet.create({
  container: {
    
    paddingTop:20,
  },
});

export default viewPhoto;
