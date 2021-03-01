import React, {Component} from 'react';
import {ToastAndroid, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import { Button , Text} from 'native-base';

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      first_name_error:'',
      last_name_error:'',
      email_error:'',
      password_error:'',
      password_length:'',

    };
  }
  signup = () => {
    //Validation Here
    if(!this.state.email.includes('@')){
      this.setState({email_error: "not a valid email"})
    }
   if(this.state.password.length <5){
     this.setState({password_length: "password must be greater than 5 characters"})
   }
else {


    
    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw 'Failed Validation';
        } else {
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log('User created with ID', responseJson);
        this.props.navigation.navigate('Login');
        ToastAndroid.show('User created', ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };
  }
  FnameValidation(){
    if (this.state.first_name=='')
    {
      this.setState({first_name_error: "first name can't be empty"})
    }
  }
  LnameValidation(){
    if(this.state.last_name=='')
    {
      this.setState({last_name_error: "last name can't be empty"})
    }
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Enter your first name..."
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
          onBlur={() => this.FnameValidation()}
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />
        <View style={{height:10}} />
        <TextInput
          placeholder="Enter your last name"
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name}
          onBlur={() => this.LnameValidation()}
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />

        <View style={{height:10}} />

        <TextInput
          placeholder="Enter your email.."
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          style={{padding: 5, borderWidth: 2, margin: 5}}
        />
        <Text style={{color:'red'}} >{this.state.email_error}</Text>
                        

        <View style={{height:10}} />

        <TextInput
          placeholder="Enter your password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          style={{padding: 5, borderWidth: 2, margin: 5}}
          secureTextEntry={true}
        />
                <Text style={{color:'red'}} >{this.state.password_length}</Text>

               
        <View style={{height:25}} />

        <Button  
        onPress={() => this.signup()}
        block style={{backgroundColor: 'red' , width:'100%'}} >
          <Text>Create Account</Text>
        </Button>
      </View>
    );
  }
}


export default SignupScreen;
