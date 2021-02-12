import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/home';
import Page2 from '../screens/page2';

const screens = {
    Home: {
        screen:Home
    },
    Page2: {
      screen: Page2
    }

}

const homestack = createStackNavigator(screens);


export default createAppContainer(homestack);
