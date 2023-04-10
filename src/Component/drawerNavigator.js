import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomePage from '../Pages/homePage';
import ProfilePage from '../Pages/ProfilePage';
import DrawerSideBar from './Drawer';
import MapPage from '../Pages/mapPage';
import ForumPage from '../Pages/forumPage';

const DrawerNavigator = createDrawerNavigator();
function DrawerNavigation() {
  return (

      <DrawerNavigator.Navigator drawerContent={() => <DrawerSideBar />} screenOptions={{drawerPosition:'left', headerShown:false}} >
        <DrawerNavigator.Screen name="Home" component={HomePage} />
        <DrawerNavigator.Screen name="MapPage" component={MapPage} />
        <DrawerNavigator.Screen name="ForumPage" component={ForumPage} />
        <DrawerNavigator.Screen name="profile" component={ProfilePage} />
      </DrawerNavigator.Navigator>

  );
}
export default DrawerNavigation;
