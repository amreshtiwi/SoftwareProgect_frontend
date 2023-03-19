import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../color";

function Input({label,keyboardType}) {
  return (
    <TextInput
    style={styles.input}
    label={label}
    mode="outlined"
    selectionColor={Colors.darkGreen}
    outlineColor={Colors.darkGreen}
    activeOutlineColor={Colors.darkGreen}
    keyboardType={keyboardType}
  />
  );
}
 //numeric .. email-address .. default
const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.lightVanilla1,
        marginVertical: 5,
        borderRadius: 10,
        width:'100%'
    },
})
export default Input;
