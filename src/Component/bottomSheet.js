import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import Colors from "../color";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';

function BottomSheetNavigation({visible,toggle, chooseFromLibrary,takePhoto}) {
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View style={styles.bottomNavigationView}>
        <Pressable style={styles.bottomNavigationBtn} onPress={chooseFromLibrary}>
          <Ionicons name="images" size={24} color="black" style={{marginHorizontal:10}}/>
          <Text>إختيار من المعرض</Text>
        </Pressable>
        <Pressable style={styles.bottomNavigationBtn} onPress={takePhoto}>
        <FontAwesome5 name="camera" size={24} color="black" style={{marginHorizontal:10}}/>
          <Text>إلتقاط صورة</Text>
        </Pressable>
        <Pressable style={styles.bottomNavigationBtn} onPress={toggle}>
          <Text>إلغاء</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: Colors.lightVanilla,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavigationBtn: {
    flexDirection:'row',
    backgroundColor: Colors.lightVanilla1,
    width: "95%",
    height: 40,
    marginVertical: 3,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default BottomSheetNavigation;
