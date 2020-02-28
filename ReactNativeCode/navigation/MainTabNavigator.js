/********************************************************************/
/*  Author:     Stephen Magrowski                                   */
/*  Created:    January 26, 2020                                    */
/*  Course:     CSC 355-020                                         */
/*  Professor:  Dr. Tan                                             */
/*  Filename:   MainTabNavigator.js                                 */
/*  Purpose:    This file contains the navigation tab shown at      */
/*              the bottom of some screens. Once a user has         */
/*              logged into an account the navigation tab is        */
/*              displayed.                                          */
/*                                                                  */
/********************************************************************/

import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UpdateScreen from '../screens/UpdateScreen';
import CartScreen from '../screens/CartScreen';
import BreakfastDetail from '../screens/BreakfastDetail';

// Home screen stack
const HomeStack = createStackNavigator(
  {
  Home:  {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
  Update: {
    screen: UpdateScreen,
    navigationOptions: {
      title: 'Update Info',
    },
  },
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
      },
      headerBackTitleStyle: {
        color: 'white',
        fontSize: Dimensions.get('window').height*.025,
    }
  }
}
);

// Customize tab icon and label
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: 'brown',
    inactiveTintColor: 'gray',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
    ),
};

HomeStack.path = '';

// Menu screen stack
const MenuStack = createStackNavigator(
  {
    Menu: {
      screen: MenuScreen,
      navigationOptions: {
        title: 'Menu',
      },
    },
    BreakfastDetail: {
      screen: BreakfastDetail,
      navigationOptions: {
        title: 'Classic Bagelwiches',
      },
    },
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
            fontSize: Dimensions.get('window').height*.027,
        },
        headerBackTitleStyle: {
          color: 'white',
          fontSize: Dimensions.get('window').height*.025,
      }
    }
  }
);

// Customize tab icon and label
MenuStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarOptions: {
    activeTintColor: 'brown',
    inactiveTintColor: 'gray',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-paper'} />
  ),
};

MenuStack.path = '';

// About screen stack
const AboutStack = createStackNavigator(
  {
    About: {
      screen: AboutScreen,
      navigationOptions: {
        title: 'Information',
      },
    },
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

// Customize tab icon and label
AboutStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarOptions: {
    activeTintColor: 'brown',
    inactiveTintColor: 'gray',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle`
          : 'md-information-circle'
      }
    />
  ),
};

AboutStack.path = '';

const CartStack = createStackNavigator(
  {
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        title: 'Your Order',
      },
    },
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

// Customize tab icon and label
CartStack.navigationOptions = {
  tabBarLabel: 'Bag',
  tabBarOptions: {
    activeTintColor: 'brown',
    inactiveTintColor: 'gray',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-briefcase`
          : 'md-briefcase'
      }
    />
  ),
};

CartStack.path = '';

// Create tab navigator from stack values
const tabNavigator = createBottomTabNavigator({
  HomeStack,
  MenuStack,
  CartStack,
  AboutStack,
});

tabNavigator.path = '';

export default tabNavigator;