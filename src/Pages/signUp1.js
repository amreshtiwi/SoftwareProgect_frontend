import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import SignUpNavigationBar from "../Component/signUpNavigatorBar";
import Input from "../Component/input";
import SegmentedBtns from "../Component/segmentedBtns";

function SignUp1({ navigation }) {
  const back = () => {
    navigation.navigate("login");
  };
  return (
    <View style={styles.signUpPage}>
      <View style={styles.bar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: Colors.lightVanilla,
              borderRadius: 70,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: 90,
                height: 90,
                borderRadius: 70,
              }}
              source={require("frontend/assets/logo.png")}
            />
          </View>
          <Text style={[styles.title, { marginHorizontal: 10 }]}>
            إنشاء حساب
          </Text>
        </View>
        <Pressable onPress={back}>
          <Ionicons name="arrow-back" size={24} color={Colors.lightVanilla} />
        </Pressable>
      </View>

      <View style={styles.signUpContent}>
        <SignUpNavigationBar pageNumber={1}></SignUpNavigationBar>
        <Text style={styles.title2}>المعلومات الشخصية</Text>
        <Input label="الإسم الرباعي" keyboardType="default"></Input>
        <Input label="رقم الهوية" keyboardType="numeric"></Input>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{width:'60%'}}>الجنس</Text>
          <SegmentedBtns style={{width:'40%'}} ></SegmentedBtns>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpPage: {
    marginVertical: 50,
    marginHorizontal: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.lightVanilla,
  },
  bar: {
    flexDirection: "row",
    backgroundColor: Colors.darkGreen,
    width: "100%",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.lightVanilla,
  },
  title2: {
    fontSize: 18,
    color: Colors.black,
  },
  signUpContent: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 30,
  },
});

export default SignUp1;
