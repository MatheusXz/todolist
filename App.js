import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


import Casamento from './src/pages/casamento';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Casamento />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight || 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
