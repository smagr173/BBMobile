/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 25, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   AppNavigator.js                                     */
/*  Purpose:    This file includes the main navigation stack for    */
/*              linking to the various screens. This file also      */
/*              imports the content of the MainTabNavigator file.   */
/*                                                                  */
/********************************************************************/

import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import InitialScreen from '../screens/InitialScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

import MainTabNavigator from './MainTabNavigator';  // Import navigation tab

// Main navigation stack
// If its in here it does not get a navigation tab
const MainStack = createStackNavigator(
  {
    Initial:  {
      screen: InitialScreen,
      navigationOptions: {
        title: '',
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        title: 'Register',
      },
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        title: 'Sign In',
      },
    },
  },
  {
    headerLayoutPreset: 'center',
    initialRouteName: 'Initial',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#202020',
            height: Dimensions.get('window').width*.115,
            
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: Dimensions.get('window').height*.027,
        },
        headerBackTitleStyle: {
          color: 'white',
          fontSize: Dimensions.get('window').height*.025,
      }
    }
  }
);

const CheckoutStack = createStackNavigator(
  {
    Checkout: {
      screen: CheckoutScreen,
      navigationOptions: {
        title: 'Checkout',
        mode: 'modal'
      }
    }
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#202020',
            height: Dimensions.get('window').height*.07,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontSize:Dimensions.get('window').height*.027,
        }
    }
  }
);

export default createAppContainer(
  createSwitchNavigator({
    User: MainStack,
    Main: MainTabNavigator,
    CheckoutStack,
  })
);