import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../color";

function Btn({value,handler}) {
  return (
    <Pressable
      onPress={handler}
      style={[
        styles.Btn,
        { width: "100%", marginTop: 10, backgroundColor: Colors.darkGreen },
      ]}
    >
      <Text style={styles.btnTxt}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Btn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    elevation: 10,
  },
  btnTxt: {
    color: Colors.lightVanilla,
    fontWeight: "bold",
  },
});
export default Btn;
