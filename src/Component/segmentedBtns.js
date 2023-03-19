import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, SegmentedButtons } from "react-native-paper";
import Colors from "../color";

function SegmentedBtns() {
  const [value, setValue] = React.useState("");
  return (

    <SegmentedButtons
    //   style={styles.segmentedBtns}
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: "ذكر",
          label: "ذكر",
          icon: "human-male",
          style: styles.segmentedBtns,
          checkedColor: Colors.darkGreen,
        },
        {
          value: "أنثى",
          label: "أنثى",
          icon: "human-female",
          style: styles.segmentedBtns,
          checkedColor: Colors.darkGreen,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  segmentedBtns: {
    backgroundColor: Colors.lightVanilla1,
  },
});
export default SegmentedBtns;
