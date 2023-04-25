import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../color";

function LawyerTab({handler}) {
  return (
    <Pressable style={{width:'100%', alignItems:'center'}} onPress={handler}>
      <View style={styles.tab}>
        <Image
          source={require("frontend/assets/myPic.png")}
          style={styles.tabImage}
        />
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={styles.tabTitle}>المحامي أحمد محمد</Text>
          <Text>نابلس, شارع سفيان</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    width: "95%",
    height: 60,
    backgroundColor: Colors.lightVanilla1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: Colors.darkGreen,
  },
  tabImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 10,
    marginHorizontal: 10,
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
export default LawyerTab;
