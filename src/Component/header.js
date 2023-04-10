import React, { useState } from "react";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import Colors from "../color";

function Header({ navigation, name = "فلان" }) {
  const [notification, setNotfication] = useState(false);
  const toggleNotification = () => {
    setNotfication(!notification);
  };
  return (
    <View style={styles.bar}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: Colors.lightVanilla,
            borderRadius: 70,
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 70,
            }}
            source={require("frontend/assets/logo.png")}
          />
        </View>
        <Text style={[styles.title, { marginHorizontal: 10 }]}>{name}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={toggleNotification}>
          {!notification ? (
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.lightVanilla}
              style={{ marginHorizontal: 20 }}
            />
          ) : (
            <Ionicons
              name="notifications-sharp"
              size={24}
              color={Colors.lightVanilla}
              style={{ marginHorizontal: 20 }}
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <Entypo name="menu" size={24} color={Colors.lightVanilla} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: Colors.darkGreen,
    width: "100%",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.lightVanilla,
  },
});
export default Header;
