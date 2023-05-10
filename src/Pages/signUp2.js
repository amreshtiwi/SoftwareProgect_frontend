import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import SignUpNavigationBar from "../Component/signUpNavigatorBar";
import Input from "../Component/input";
import Btn from "../Component/button";
import UserContext from "../context/signUpContext";

function SignUp2({ navigation, onUserUpdate }) {
  const [caution, setCaution] = useState(false);
  const [emailCaution,setEmailCaution] = useState(false);
  const [phoneNumberCaution, setPhoneNumberCaution] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");

  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  const phoneNumberValidation =  /^(059|056)\d{7}$/;

  const user = useContext(UserContext);
  // console.log(user);

  const back = () => {
    navigation.navigate("signUp1");
  };

  const nextSignUp = () => {
    navigation.navigate("signUp1");
  };

  const finalSignUp = () => {
    setCaution(false);
    setEmailCaution(false);
    setPhoneNumberCaution(false);

    if(!email||!phoneNumber||!password||(user.roleValue == '2' && !licenceNumber)){
      setCaution(true);
    }else{
      if(emailValidation.test(email)){
        if(phoneNumberValidation.test(phoneNumber)){
          setCaution(false);
          setEmailCaution(false);
          setPhoneNumberCaution(false);
  
          const updateUser = {...user,email,password,phoneNumber,licenceNumber};
          onUserUpdate(updateUser);
          navigation.navigate("signUp3");
        }else{
          setPhoneNumberCaution(true);
        }
      }else{
        setEmailCaution(true);
      }
    }
    
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
        <SignUpNavigationBar
          pageNumber={2}
          goPage1={nextSignUp}
          goPage3={finalSignUp}
        ></SignUpNavigationBar>
        <Text style={[styles.title2, { paddingTop: 30 }]}> معلومات الحساب</Text>
        {caution ? <Text style={{color:'red'}}>يرجى ملئ جميع الخانات</Text> : <View></View>}
        <Input
          label="البريد الإلكتروني"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
          }}
        ></Input>
        {emailCaution ? <Text style={{color:'red'}}>البريد الالكتروني غير متاح</Text> : <View></View>}
        <Input
          label="رقم الجوال"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(phoneNumber) => {
            setPhoneNumber(phoneNumber);
          }}
        ></Input>
        {phoneNumberCaution ? <Text style={{color:'red'}}>رقم المحمول غير متاح</Text> : <View></View>}
        {user.roleValue == "2" ? (
          <Input
            label={"رقم العضويه"}
            value={licenceNumber}
            onChangeText={(licenceNumber) => {
              setLicenceNumber(licenceNumber);
            }}
          ></Input>
        ) : null}

        <Input
          label="كلمة المرور"
          isPassword={true}
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
        ></Input>
        {/* <Input label="تأكيد كلمة المرور" isPassword={true}></Input> */}

        <Btn value={"التالي"} handler={finalSignUp}></Btn>
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

export default SignUp2;
