import { StatusBar } from "expo-status-bar";
import { I18nManager } from "react-native";
import Colors from "./src/color";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp1 from "./src/Pages/signUp1";
import LoginPage from "./src/Pages/login";
import SignUp2 from "./src/Pages/signUp2";
import SignUp3 from "./src/Pages/signUp3";
import DrawerNavigation from "./src/Component/drawerNavigator";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi } from "./src/api/loginApi";
import SignupFlow from "./src/store/signUpstore";
import { auth } from "./src/store/firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BaseToast } from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";

I18nManager.forceRTL(true);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.lightVanilla,
  },
};

const toastconfig = {
  info: (props) => <BaseToast {...props} style={{ borderLeftColor: Colors.darkGreen }} />,
};

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();

export default function App() {

  return (
    <>
      <StatusBar style="auto" />
      <MenuProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen name="drawer" component={DrawerNavigation} />
          <Stack.Screen name="signUp" component={SignupFlow} />

        </Stack.Navigator>
      </NavigationContainer>
      </MenuProvider>
      <Toast config={toastconfig}/>
    </>
  );
}
          {/* <Stack.Screen name="signUp1" component={SignUp1} />
            <Stack.Screen name="signUp2" component={SignUp2} />
            <Stack.Screen name="signUp3" component={SignUp3} /> */}
          {/* <Stack.Screen name="drawer" component={DrawerNavigation} /> */}
          {/* <Stack.Screen name="drawer" component={DrawerNavigation} />  */}