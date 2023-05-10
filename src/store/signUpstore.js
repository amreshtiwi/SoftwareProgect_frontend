import React, { useState } from "react";
import SignUp1 from "../Pages/signUp1";
import SignUp2 from "../Pages/signUp2";
import SignUp3 from "../Pages/signUp3";
import UserContext from "../context/signUpContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function SignupFlow() {
  const [user, setUser] = useState(null);

  function handleUserUpdate(updatedUser) {
    setUser(updatedUser);
  }

  return (
    <UserContext.Provider value={user}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="signUp1">
            {props => <SignUp1 {...props} onUserUpdate={handleUserUpdate}></SignUp1>}
        </Stack.Screen>
        <Stack.Screen name="signUp2">
            {props => <SignUp2 {...props} onUserUpdate={handleUserUpdate}></SignUp2>}
        </Stack.Screen>
        <Stack.Screen name="signUp3" component={SignUp3} />
      </Stack.Navigator>
      {/* <SignUp1 onUserUpdate={handleUserUpdate}></SignUp1> */}
      {/* <SignUp2></SignUp2> */}
      {/* <SignUp3></SignUp3> */}
    </UserContext.Provider>
  );
}
