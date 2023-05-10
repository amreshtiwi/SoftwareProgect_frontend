import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../color";

function SignUpNavigationBar({ pageNumber = 1, goPage1, goPage2, goPage3 }) {
  return (
    <View style={styles.bar}>
      <Pressable onPress={goPage1}>
        <View
          style={[
            styles.pageBtn,
            pageNumber === 1
              ? styles.pageBtnSizeSelected
              : styles.pageBtnSizeNormal,
          ]}
        >
          <Text
            style={
              pageNumber === 1 ? styles.pageBtnTxtSelected : styles.pageBtnTxt
            }
          >
            1
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={goPage2}>
        <View
          style={[
            styles.pageBtn,
            pageNumber === 2
              ? styles.pageBtnSizeSelected
              : styles.pageBtnSizeNormal,
          ]}
        >
          <Text
            style={
              pageNumber === 2 ? styles.pageBtnTxtSelected : styles.pageBtnTxt
            }
          >
            2
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={goPage3}>
        <View
          style={[
            styles.pageBtn,
            pageNumber === 3
              ? styles.pageBtnSizeSelected
              : styles.pageBtnSizeNormal,
          ]}
        >
          <Text
            style={
              pageNumber === 3 ? styles.pageBtnTxtSelected : styles.pageBtnTxt
            }
          >
            3
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.darkGreen,
    height: 2,
    width: "80%",
    alignContent: "center",
    alignItems: "center",
  },
  pageBtn: {
    backgroundColor: Colors.darkGreen,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  pageBtnSizeNormal: {
    width: 25,
    height: 25,
  },
  pageBtnSizeSelected: {
    width: 35,
    height: 35,
    backgroundColor: Colors.yellow,
    elevation: 10,
  },
  pageBtnTxt: {
    color: Colors.lightVanilla,
  },
  pageBtnTxtSelected: {
    color: Colors.black,
  },
});
export default SignUpNavigationBar;
