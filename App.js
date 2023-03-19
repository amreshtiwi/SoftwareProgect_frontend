import { StatusBar } from "expo-status-bar";
import { I18nManager, StyleSheet, View } from "react-native";
import Colors from "./src/color";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp1 from "./src/Pages/signUp1";
import LoginPage from "./src/Pages/login";

I18nManager.forceRTL(true);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.lightVanilla,
  },
};

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen name="login" component={LoginPage} /> */}
          <Stack.Screen name="signUp" component={SignUp1} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <LoginPage></LoginPage> */}
      {/* <SignUp0></SignUp0> */}
    </>
  );
}
