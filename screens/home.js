import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Button, Text} from 'native-base';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <Container style={styles.container}>
        <Text style={styles.text}>Main Menu</Text>

        <View style={styles.space} />
        <Button
          block
          style={{backgroundColor: 'red', width: '100%'}}
          onPress={() => navigation.navigate('Account Management')}>
          <Text>Account</Text>
        </Button>

        <View style={styles.space} />

        <Button
          block
          style={{backgroundColor: 'blue', width: '100%'}}
          onPress={() => navigation.navigate('LocationReviews')}>
          <Text>Location and Reviews</Text>
        </Button>
      </Container>
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
  space: {
    height: 40,
  },
  text: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default HomeScreen;
