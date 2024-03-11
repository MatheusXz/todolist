import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home from './src/pages/home/';
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
  },
});
