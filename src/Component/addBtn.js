import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../color";

function AddBtn({ label, handler, iconName, buttonColor=Colors.lightVanilla1, textColor=Colors.darkGreen, mode="elevated"}) {
  return (
    <Button
      icon={({ size, color }) => (
        <Ionicons name={iconName} size={size} color={color} />
      )}
      mode="elevated"
      onPress={handler}
      buttonColor={buttonColor}
      textColor={textColor}
    >
      {label}
    </Button>
  );
}
export default AddBtn;
