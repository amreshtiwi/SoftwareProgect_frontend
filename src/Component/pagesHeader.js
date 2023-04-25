import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../color";
import { Ionicons } from "@expo/vector-icons";

function HeaderPages({back , label,backgroundColor=Colors.darkGreen}) {
  return (
    <View style={[styles.bar,{backgroundColor:backgroundColor}]}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={[styles.title, { marginHorizontal: 10 }]}>
        {label}
      </Text>
    </View>
    <Pressable onPress={back}>
      <Ionicons name="arrow-back" size={24} color={Colors.lightVanilla} />
    </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        // backgroundColor: Colors.darkGreen,
        width: "95%",
        height: 70,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 20,
        elevation: 0,
        marginTop:25,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.lightVanilla,
      },
}); 
export default HeaderPages;
