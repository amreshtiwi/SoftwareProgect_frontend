import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../color";

function Input({
  label,
  keyboardType = "default",
  disable = false,
  placeholder = "",
  width = "100%",
  isPassword = false,
}) {

  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <TextInput
      style={[styles.input, { width: width }]}
      label={label}
      mode="outlined"
      selectionColor={Colors.lightVanilla1}
      outlineColor={Colors.lightVanilla1}
      activeOutlineColor={Colors.darkGreen}
      keyboardType={keyboardType}
      disabled={disable}
      placeholder={placeholder}
      secureTextEntry={isPassword}
      right={
        isPassword ? (
          <TextInput.Icon
            icon={passwordVisible ? "eye" : "eye-off"}
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}
            color={Colors.darkGreen}
          />
        ) : (
          null
        )
      }
    />
  );
}
//numeric .. email-address .. default
const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightVanilla1,
    marginVertical: 5,
    borderRadius: 10,
  },
});
export default Input;
