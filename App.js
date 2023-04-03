import { StatusBar } from "expo-status-bar";
import { I18nManager, StyleSheet, View } from "react-native";
import Colors from "./src/color";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp1 from "./src/Pages/signUp1";
import LoginPage from "./src/Pages/login";
import SignUp2 from "./src/Pages/signUp2";
import SignUp3 from "./src/Pages/signUp3";
import HomePage from "./src/Pages/homePage";
import ProfilePage from "./src/Pages/ProfilePage";
import DrawerNavigation from "./src/Component/drawerNavigator";

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
          {/* <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen name="signUp1" component={SignUp1} />
          <Stack.Screen name="signUp2" component={SignUp2} />
          <Stack.Screen name="signUp3" component={SignUp3} /> */}
          <Stack.Screen name="drawer" component={DrawerNavigation}/>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <LoginPage></LoginPage> */}
      {/* <SignUp0></SignUp0> */}
    </>
  );
}
