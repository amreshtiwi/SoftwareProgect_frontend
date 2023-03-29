import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, SegmentedButtons } from "react-native-paper";
import Colors from "../color";

function SegmentedBtns(props) {
  const [value, setValue] = React.useState("");

  return (
    <SegmentedButtons
      //   style={styles.segmentedBtns}
      style={{paddingVertical:7}}
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: props.firstValue,
          label: props.firstValue,
          icon: props.firstIcon,
          style: {
            backgroundColor:
              value === props.firstValue
                ? Colors.darkGreen
                : Colors.lightVanilla1,
            borderColor: Colors.lightVanilla1,
          },
          checkedColor: Colors.lightVanilla,
        },
        {
          value: props.secValue,
          label: props.secValue,
          icon: props.secIcon,
          style: {
            backgroundColor:
              value === props.secValue
                ? Colors.darkGreen
                : Colors.lightVanilla1,
            borderColor: Colors.lightVanilla1,
          },
          checkedColor: Colors.lightVanilla,
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
