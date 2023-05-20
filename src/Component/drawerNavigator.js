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
import LawyerMap from "../Pages/lawyerMap";
import ChatList from "../Pages/chatList";
import { auth } from "../store/firebase";
import TransactionPage from "../Pages/transactionPage";
import CreateTransactionPage from "../Pages/createTransactionPage";
import MyTransactionPage from "../Pages/myTransactionPage";

const DrawerNavigator = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const LawyerProfileStackNavigatior = createNativeStackNavigator();
const transactionStack = createDrawerNavigator();

const TransactionStack = ({ user }) => {
  return (
    <transactionStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <transactionStack.Screen name="transaction" component={TransactionPage} />
      <transactionStack.Screen
        name="createTransaction"
      >
        {(props) => <CreateTransactionPage {...props} user={user} />}
      </transactionStack.Screen>

      <transactionStack.Screen name="myTransaction">
        {(props) => <MyTransactionPage {...props} user={user} />}
      </transactionStack.Screen>
    </transactionStack.Navigator>
  );
};

const LawyerProfileStack = ({ route, user }) => {
  const { id } = route.params;
  return (
    <LawyerProfileStackNavigatior.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LawyerProfileStackNavigatior.Screen name="LawyerProfilePage">
        {(props) => <LawyerProfilePage {...props} id={id} user={user} />}
      </LawyerProfileStackNavigatior.Screen>
      <LawyerProfileStackNavigatior.Screen
        name="BookingPage"
        component={BookingPage}
      />
      <LawyerProfileStackNavigatior.Screen name="chat" component={ChatPage} />
      <LawyerProfileStackNavigatior.Screen
        name="lawyerMap"
        component={LawyerMap}
      />
    </LawyerProfileStackNavigatior.Navigator>
  );
};
const LawyerStack = ({ route, user }) => {
  const { latitude, longitude } = route.params;

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
      <Stack.Screen name="LawyerProfileStack">
        {(props) => <LawyerProfileStack {...props} user={user} />}
      </Stack.Screen>
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
            auth.onAuthStateChanged((user) => {
              if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;
                console.log("log in firebase Done");
                // ...
              } else {
                // User is signed out
                // ...
                console.log("log in firebase faild");
              }
            });
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
        <DrawerNavigator.Screen name="ForumPage">
          {(props) => <ForumPage {...props} user={user} />}
        </DrawerNavigator.Screen>
        <DrawerNavigator.Screen name="chatList">
          {(props) => <ChatList {...props} user={user} />}
        </DrawerNavigator.Screen>
        <DrawerNavigator.Screen name="chat" component={ChatPage} />
        <DrawerNavigator.Screen name="transactionStack">
          {(props) => <TransactionStack {...props} user={user} />}
        </DrawerNavigator.Screen>
        <DrawerNavigator.Screen name="LawyerStack">
          {(props) => <LawyerStack {...props} user={user} />}
        </DrawerNavigator.Screen>
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
