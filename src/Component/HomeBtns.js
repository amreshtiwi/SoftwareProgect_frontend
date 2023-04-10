import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../color";

function HomeBtns({ label ,handler,children }) {
  return (
    <Pressable style={styles.container} onPress={handler}>
      <View style={styles.txtContainer}>
        <Text style={styles.btnText}>{label}</Text>
        <Text style={{paddingHorizontal:5}}>{children}</Text> 
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "43%",
    backgroundColor: Colors.lightVanilla1,
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.darkGreen,
    margin: 10,
  },
  txtContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  btnText: {
    fontSize: 20,
  },
});
export default HomeBtns;
