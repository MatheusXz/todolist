import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
