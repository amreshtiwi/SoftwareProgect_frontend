import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../color";

function SignUpNavigationBar({pageNumber = 1}) {
  return (
    <View style={styles.bar}>
      <View style={[styles.pageBtn, pageNumber === 1 ? styles.pageBtnSizeSelected : styles.pageBtnSizeNormal]}>
        <Text style={styles.pageBtnTxt}>1</Text>
      </View>
      <View style={[styles.pageBtn, pageNumber === 2 ? styles.pageBtnSizeSelected : styles.pageBtnSizeNormal]}>
        <Text style={styles.pageBtnTxt}>2</Text>
      </View>
      <View style={[styles.pageBtn, pageNumber === 3 ? styles.pageBtnSizeSelected : styles.pageBtnSizeNormal]}>
        <Text style={styles.pageBtnTxt}>3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    bar:{
        flexDirection:'row',
        justifyContent: "space-between",
        backgroundColor: Colors.darkGreen,
        height:2,
        width:'80%',
        alignContent: "center",
        alignItems: "center",
    },
    pageBtn:{
        backgroundColor: Colors.darkGreen,
        width:25,
        height:25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
    },
    pageBtnSizeNormal:{
        width:25,
        height:25,
    },
    pageBtnSizeSelected:{
        width:35,
        height:35,
    },
    pageBtnTxt:{
        color: Colors.lightVanilla,
    }
});
export default SignUpNavigationBar;
