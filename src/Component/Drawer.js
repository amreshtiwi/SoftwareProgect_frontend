import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo,FontAwesome,Fontisto  } from "@expo/vector-icons";

import Colors from "../color";

function DrawerSideBar() {
  return (
    <View style={styles.container}>
      <View style={styles.imageNameContainer}>
        <Image
          style={{
            width: 90,
            height: 90,
            borderRadius: 70,
            backgroundColor: '#fff',
          }}
          source={require("frontend/assets/User-avatar.png")}
        />
        <Text style={{ margin: 20 }}>فلان الفلان</Text>
      </View>

      <View style={{ width: "100%" }}>
        <Pressable style={styles.drawerItem}>
          <Text style={{marginHorizontal:20}}>الصفحة الرئيسية</Text>
          <Entypo name="home" size={24} color={Colors.darkGreen} />
        </Pressable>
        <Pressable style={styles.drawerItem}>
          <Text style={{marginHorizontal:20}}>الصفحة الشخصية</Text>
          <FontAwesome name="user" size={24} color={Colors.darkGreen} />
        </Pressable>
        <Pressable style={styles.drawerItem}>
          <Text style={{marginHorizontal:20}}>الإعدادات</Text>
          <Fontisto name="player-settings" size={24} color={Colors.darkGreen} />
        </Pressable>
        <Pressable style={styles.drawerItem}>
          <Text style={{marginHorizontal:20}}>تسجيل الخروج</Text>
          <Entypo name="log-out" size={24} color={Colors.darkGreen} />
        </Pressable>
      </View>

      <View>
        <Text style={{color:'gray'}}>عمرو و أحمد</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:Colors.lightVanilla,
  },
  imageNameContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  drawerItem: {
    width: "95%",
    backgroundColor: Colors.lightVanilla1,
    flexDirection: "row",
    justifyContent:"space-between",
    padding:10,
    margin:5,
    borderRadius: 20
  },
});
export default DrawerSideBar;
