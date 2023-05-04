import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import Colors from "../color";
import SignUpNavigationBar from "../Component/signUpNavigatorBar";
import Input from "../Component/input";
import SegmentedBtns from "../Component/segmentedBtns";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "../Component/dateTimePicker";
import Btn from "../Component/button";
import DropDownList from "../Component/dropDownList";
import { ScrollView } from "react-native-gesture-handler";
import UserContext from "../context/signUpContext";

function SignUp1({ navigation, onUserUpdate }) {
  const [caution, setCaution] = useState(false);
  const [fullName, setFulName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [birthdayString, setBirthdayString] = useState("");
  const [birthdayDate, setBirthdayDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [userRole, setUserRole] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const user = useContext(UserContext);

  const back = () => {
    navigation.navigate("login");
  };

  const nextSignUp = () => {
    setCaution(false);
    console.log("fullname:",fullName);
    console.log("idNumber:",idNumber);
    console.log("birthdayString:",birthdayString);
    console.log("gender:",gender);
    console.log("userRole:",userRole);
    console.log("maritalStatus:",maritalStatus);
    console.log("city:",city);
    console.log("address:",address);

    if(!fullName&&!idNumber&&!birthdayString&&!gender&&!userRole&&!maritalStatus&&!city&&!address){
      setCaution(true);
    }else{
      setCaution(false);
      const updateUser = {...user,fullName,idNumber,birthdayDate,gender,userRole,maritalStatus,city,address};
      onUserUpdate(updateUser);
      navigation.navigate("signUp2");
    }
    
  };

  const finalSignUp = () => {
    navigation.navigate("signUp3");
  };
  return (
    <ScrollView>
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
          <SignUpNavigationBar
            pageNumber={1}
            goPage2={nextSignUp}
            goPage3={finalSignUp}
          ></SignUpNavigationBar>
          <Text style={[styles.title2, { paddingTop: 30 }]}>
            المعلومات الشخصية
          </Text>
          {caution ? <Text style={{color:'red'}}>يرجى ملئ جميع الخانات</Text> : <View></View>}
          <Input
            label="الإسم الرباعي"
            value={fullName}
            onChangeText={(fullName) => {
              setFulName(fullName);
            }}
          ></Input>
          <Input
            label="رقم الهوية"
            keyboardType="numeric"
            value={idNumber}
            onChangeText={(id) => {
              setIdNumber(id);
              console.log("marital:", maritalStatus);
            }}
          ></Input>
          <SegmentedBtns
            firstValue="ذكر"
            firstIcon="human-male"
            secValue="أنثى"
            secIcon="human-female"
            value={gender}
            setValue={setGender}
          ></SegmentedBtns>
          <SegmentedBtns
            firstValue="محامي"
            firstIcon="scale-balance"
            secValue="مواطن"
            secIcon="human-male-female-child"
            value={userRole}
            setValue={setUserRole}
          ></SegmentedBtns>
          <DatePicker
            value={birthdayString}
            setValue={setBirthdayString}
            setDate={setBirthdayDate}
          ></DatePicker>
          {/* <Input label="الحالة الإجتماعية"></Input> */}
          <DropDownList
            setSelected={(val) => setMaritalStatus(val)}
          ></DropDownList>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Input
              label="المدينة"
              width="48%"
              value={city}
              onChangeText={(city) => {
                setCity(city);
              }}
            ></Input>
            <Input
              label="العنوان"
              width="48%"
              value={address}
              onChangeText={(address) => {
                setAddress(address);
              }}
            ></Input>
          </View>
          <Btn value={"التالي"} handler={nextSignUp}></Btn>
        </View>
      </View>
    </ScrollView>
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
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.lightVanilla,
  },
  title2: {
    fontSize: 18,
    color: Colors.black,
    paddingVertical: 10,
  },
  signUpContent: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 30,
    // alignContent: "space-between",
    // justifyContent: "space-between",
  },
});

export default SignUp1;
