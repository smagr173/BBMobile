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

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import InitialScreen from '../screens/InitialScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';


import MainTabNavigator from './MainTabNavigator';  // Import navigation tab

// Main navigation stack
// If its in here it does not get a navigation tab
const MainStack = createStackNavigator(
  {
    Initial: InitialScreen,
    Register: RegisterScreen,
    SignIn: SignInScreen,
  }
);

export default createAppContainer(
  createSwitchNavigator({
    User: MainStack,
    Main: MainTabNavigator,
  })
);