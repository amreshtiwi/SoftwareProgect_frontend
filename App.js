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
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi } from "./src/api/loginApi";

I18nManager.forceRTL(true);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.lightVanilla,
  },
};

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();
export default function App() {
  const [token, setToken] = useState(null);
  const [loginCaution, setLoginCation] = useState(false);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      // AsyncStorage.clear();
      try {
        userToken = await AsyncStorage.getItem("AccessToken");
        console.log("token: ", userToken);
      } catch (e) {
        // Restoring token failed
        userToken = null;
      }
      setToken(userToken);
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        loginApi({
          email: data.email.toLocaleLowerCase(),
          password: data.password,
        })
          .then((result) => {
            if (result.status == 200) {
              AsyncStorage.setItem("AccessToken", result.data.token);
              setToken(result.data.token);

              // setIsValid(false);
              setLoginCation(false);
            } else {
              // setIsValid(true);
              setLoginCation(true);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      },
    }),
    []
  );

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer theme={MyTheme}>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {token == null ? (
              <Stack.Screen
                name="login"
                component={LoginPage}
                initialParams={{ cation: loginCaution }}
              />
            ) : (
              <Stack.Screen name="drawer" component={DrawerNavigation} />
            )}

            <Stack.Screen name="signUp1" component={SignUp1} />
            <Stack.Screen name="signUp2" component={SignUp2} />
            <Stack.Screen name="signUp3" component={SignUp3} />
            {/* <Stack.Screen name="drawer" component={DrawerNavigation} /> */}
            {/* <Stack.Screen name="drawer" component={DrawerNavigation} />  */}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </>
  );
}
