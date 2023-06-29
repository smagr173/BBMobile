import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import GetStarted from '../screens/GetStarted';
import Feed from '../screens/Feed';
import Home from '../screens/Home';
import ModalScreen from '../screens/modal';

const AuthStack = createStackNavigator();

export function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="AuthStack" component={GetStarted} />
      <AuthStack.Group screenOptions={{ presentation: 'modal' }}>
        <AuthStack.Screen name="modal" component={ModalScreen} options={{...TransitionPresets.ModalPresentationIOS}} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
}

const FeedStack = createNativeStackNavigator();

export function FeedNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="FeedStack" component={Feed} />
      {/* Put other screens or routes here */}
    </FeedStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

export function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeStack" component={Home} />
    </HomeStack.Navigator>
  );
}