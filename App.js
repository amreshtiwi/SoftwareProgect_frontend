import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginPage from './pages/login';
import Colors from './src/color';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <LoginPage></LoginPage>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightVanilla,
  },
});
