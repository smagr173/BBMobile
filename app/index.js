import { StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View, Button } from '../components/Themed';
import { scaleProp } from '../utils/scaling';

export default function welcome() {
  const insets = useSafeAreaInsets();
  const styles = useStyle(insets);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>{'BB Mobile'}</Text>

        <View style={styles.btnWrapper}>
          <Button style={styles.authButtons}>
            <Text style={styles.btnTitle}>{'View Menu'}</Text>
          </Button>
        </View>

        <View style={styles.btnWrapper}>
          <Button style={styles.authButtons}>
            <Text style={styles.btnTitle}>{'Sign Up!'}</Text>
          </Button>
        </View>

      </View>
    </SafeAreaProvider>
  );
}

const useStyle = (insets) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingHorizontal: scaleProp(40, 'any')
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    width: '100%',
    marginTop: scaleProp(42, 'any'),
    lineHeight: scaleProp(32, 'any')
  },
  btnWrapper: {
    width: '100%',
    marginBottom: scaleProp(20, 'any')
  },
  authButtons: {
    paddingVertical: scaleProp(10, 'any'),
    borderRadius: scaleProp(8, 'any'),
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleProp(50, 'any'),
    width: '100%',
  },
  btnTitle: {
    fontWeight: 'bold',
    fontSize: 15
  },
});
