import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../color";

function HomeBtns({label}) {
  return (
    <Pressable style={styles.container}>
      <View >
        <Text style={styles.btnText}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        width:'40%',
        backgroundColor:Colors.lightVanilla1,
        alignItems: "center",
        justifyContent: "center",
        height:110,
        borderRadius: 20,
        borderWidth:2,
        borderColor:Colors.darkGreen,
        margin:10
    },
    btnText:{
        fontSize:20,
    }
});
export default HomeBtns;
