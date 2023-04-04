import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';

import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const unstable_settings = { initialRouteName: 'index' };

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
