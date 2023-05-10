import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import HomePage from "../Pages/homePage";
import ProfilePage from "../Pages/ProfilePage";
import DrawerSideBar from "./Drawer";
import MapPage from "../Pages/mapPage";
import ForumPage from "../Pages/forumPage";
import LawyersPage from "../Pages/lawyersPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LawyerProfilePage from "../Pages/lawyerProfilePage";
import BookingPage from "../Pages/bookingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserApi } from "../api/getUserApi";
import ChatPage from "../Pages/chatPage";

const DrawerNavigator = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const LawyerProfileStackNavigatior = createNativeStackNavigator();

const LawyerProfileStack = ({ route }) => {
  const { id } = route.params;
  return (
    <LawyerProfileStackNavigatior.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LawyerProfileStackNavigatior.Screen name="LawyerProfilePage">
        {(props) => <LawyerProfilePage {...props} id={id} />}
      </LawyerProfileStackNavigatior.Screen>
      <LawyerProfileStackNavigatior.Screen
        name="BookingPage"
        component={BookingPage}
      />
      <LawyerProfileStackNavigatior.Screen name="chat" component={ChatPage}/>
    </LawyerProfileStackNavigatior.Navigator>
  );
};
const LawyerStack = ({ route }) => {
  const { latitude, longitude} = route.params;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LawyerPage">
        {(props) => (
          <LawyersPage {...props} latitude={latitude} longitude={longitude} />
        )}
      </Stack.Screen>
      <Stack.Screen name="LawyerProfileStack" component={LawyerProfileStack} />
    </Stack.Navigator>
  );
};
function DrawerNavigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      let userId;
      try {
        userId = await AsyncStorage.getItem("userID");
        console.log("userId home.js: ", userId);
        getUserApi(userId)
          .then((result) => {
            // let firstName = result.data.profile.name.split(" ");
            setUser(result.data);
          })
          .catch((err) => {
            console.log(err);
            console.log("here error");
          });
      } catch (e) {
        // Restoring token failed
        console.log(e);
        console.log("user id null");
      }
    };

    getUser();
  }, []);

  if (user) {
    return (
      <DrawerNavigator.Navigator
        drawerContent={() => {
          if (user) {
            return <DrawerSideBar user={user} />;
          } else {
            return null;
          }
        }}
        screenOptions={{ drawerPosition: "left", headerShown: false }}
      >
        <DrawerNavigator.Screen name="Home">
          {(props) => <HomePage {...props} user={user} />}
        </DrawerNavigator.Screen>
        <DrawerNavigator.Screen name="MapPage" component={MapPage} />
        <DrawerNavigator.Screen name="ForumPage"  >
          {(props) => <ForumPage {...props} user={user} />}
        </DrawerNavigator.Screen>
        <DrawerNavigator.Screen name="LawyerStack" component={LawyerStack} />
        <DrawerNavigator.Screen name="profile">
          {(props) => <ProfilePage {...props} user={user} />}
        </DrawerNavigator.Screen>
      </DrawerNavigator.Navigator>
    );
  } else {
    return null;
  }
}
export default DrawerNavigation;
