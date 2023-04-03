import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import DrawerSideBar from "../Component/Drawer";
import { DrawerActions } from "@react-navigation/native";
import Header from "../Component/header";
import HomeBtns from "../Component/HomeBtns";


function HomePage({navigation, name = "أهلاً فلان"}) {
  

  return (

    <View style={styles.container}>
        <Header navigation={navigation} name={name}></Header>
        <View style={styles.btnsContainer}>
            <HomeBtns label={'خرائط'}></HomeBtns>
            <HomeBtns label={'المعاملات'}></HomeBtns>
            <HomeBtns label={'المحامون'}></HomeBtns>
            <HomeBtns label={'المنتدى'}></HomeBtns>
            {/* <HomeBtns label={'خرائط'}></HomeBtns> */}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    marginHorizontal: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.lightVanilla,
  },
  btnsContainer:{
    width:'100%',
    height:'100%',
    // backgroundColor:'red',
    marginVertical:20,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'space-between',
    flexWrap: 'wrap',
    // justifyContent: "space-between",
    // alignContent:'space-between',
  }
});
export default HomePage;
