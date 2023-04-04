import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <TabBarIcon name="magnifying-glass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="information"
        options={{
          title: 'Info',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-marker" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-alt" color={color} />,
        }}
      />
    </Tabs>
  );
}
