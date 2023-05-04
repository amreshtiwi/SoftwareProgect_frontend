import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, SegmentedButtons } from "react-native-paper";
import Colors from "../color";

function SegmentedBtns(props) {
  // const [value, setValue] = React.useState("");

  return (
    <SegmentedButtons
      //   style={styles.segmentedBtns}
      style={{paddingVertical:5}}
      value={props.value}
      onValueChange={props.setValue}
      buttons={[
        {
          value: props.firstValue,
          label: props.firstValue,
          icon: props.firstIcon,
          style: {
            backgroundColor:
              props.value === props.firstValue
                ? Colors.darkGreen
                : Colors.lightVanilla1,
            borderColor: Colors.lightVanilla1,
            borderRadius:5
          },
          checkedColor: Colors.lightVanilla,
        },
        {
          value: props.secValue,
          label: props.secValue,
          icon: props.secIcon,
          style: {
            backgroundColor:
              props.value === props.secValue
                ? Colors.darkGreen
                : Colors.lightVanilla1,
            borderColor: Colors.lightVanilla1,
            borderRadius:5
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
