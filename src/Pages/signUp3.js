import React, { useContext, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import SignUpNavigationBar from "../Component/signUpNavigatorBar";
import Btn from "../Component/button";
import AddImage from "../Component/addImage";
import AddID from "../Component/addID";
import UserContext from "../context/signUpContext";
import { signUpApi } from "../api/signUpApi";
import { auth } from "../store/firebase";
import { Modal, Portal, Provider } from "react-native-paper";

// import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp3({ navigation }) {
  const [caution, setCaution] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userIDImage, setUserIDImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal , setShowModal] = useState(false)

  const user = useContext(UserContext);

  // console.log(user);
  const back = () => {
    navigation.navigate("signUp2");
  };

  const nextSignUp = () => {
    navigation.navigate("signUp1");
  };

  const finalSignUp = () => {
    setCaution(false);
    if (userIDImage === null) {
      setCaution(true);
    } else {
      setCaution(false);

      let role = "";
      let gender = "";
      let maritalStatus = "";

      if(user.genderValue == "0"){
        gender = "MALE";
      }
      if(user.genderValue == "1"){
        gender= "FEMALE";
      }
      if (user.maritalStatus == "0") {
        maritalStatus = "MARRIED";
      }
      if (user.maritalStatus == "1") {
        maritalStatus = "SINGLE";
      }
      if (user.maritalStatus == "2") {
        maritalStatus = "DIVORCED";
      }
      if (user.maritalStatus == "3") {
        maritalStatus = "WIDOWED";
      }
      if (user.roleValue == "0") {
        role = "BASIC";
      }
      if (user.roleValue == "2") {
        role = "LAWYER";
      }

      const dataSignUp = {
        email: user.email,
        password: user.password,
        id_number: Number(user.idNumber),
        role: role,
        profile: {
          gender: gender,
          name: user.fullName,
          dateOfBirth: user.birthdayDate,
          maritalStatus: maritalStatus,
          city: user.city,
          address: user.address,
          phone: user.phoneNumber,
          mobile: user.phoneNumber,
          data: {
            licenceNumber: user.licenceNumber,
            courtAddress: "no",
          },
        },
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(dataSignUp));
      formData.append("profileImage", {
        uri: userImage,
        type: "image/jpeg", // Change this to the correct MIME type for your image
        name: "userProfileImage.jpg",
      });
      formData.append("idImage", {
        uri: userIDImage,
        type: "image/png", // Change this to the correct MIME type for your image
        name: "IDImage.png",
      });
      try {
        //sign up to our server
        setLoading(true);
        setShowModal(true);
        signUpApi(formData)
          .then((result) => {
            console.log(result.data);
            const resultEmail = result.data.email;
            const resultPassword = result.data.password;
            const resultImage = result.data.profile.userProfileImage;
            const name = result.data.profile.name;

            //sign up to firebase
            auth
            .createUserWithEmailAndPassword(resultEmail, resultPassword)
            .then((userCredential) => {
              // Signed in
              var firebaseUser = userCredential.user;
              firebaseUser.updateProfile({
                displayName: name,
                photoURL: resultImage ? resultImage : "https://i.ibb.co/VwfWnph/user.png",
              }).then(() => {
                // Update successful
                // ...
              }).catch((error) => {
                var errorMessage = error.message;
                console.log('update user firebase:',errorMessage);
              });  
              // ...
            })
            .catch((error) => {
              var errorMessage = error.message;
              console.log('signup user firebase:',errorMessage);
            });

            // const data = {
            //   email:resultEmail,
            //   password:resultPassword
            // }
           
            // logIn(data);

          })
          .catch((err) => {
            console.log(err);
          }).finally(() => {
            setLoading(false);
            setShowModal(false);
            navigation.navigate("login");
          }
          );

          
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <Provider>
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
      {/* { <ActivityIndicator size="large" color={Colors.darkGreen} />} */}
      {loading &&<Portal>
        <Modal visible={showModal}>
          <View style={{backgroundColor:Colors.lightVanilla1}}>
          <ActivityIndicator size="large" color={Colors.darkGreen} />
            <Text>جاري إنشاء حساب .. سجل دخولك بعد الإنتهاء</Text>
          </View>
        </Modal>
        </Portal>}
      <View style={styles.signUpContent}>
        <SignUpNavigationBar
          pageNumber={3}
          goPage1={nextSignUp}
          goPage2={back}
        ></SignUpNavigationBar>
        <Text style={[styles.title2, { paddingTop: 30 }]}>باقي خطوة أخيرة</Text>
        <AddImage image={userImage} setImage={setUserImage}></AddImage>

        <AddID image={userIDImage} setImage={setUserIDImage}></AddID>
        {caution ? (
          <Text style={{ color: "red" }}>يجب عليك التقاط صورة للهوية</Text>
        ) : (
          <View></View>
        )}
        <Btn value={"إنهاء"} handler={finalSignUp}></Btn>
      </View>
    </View>
    </Provider>
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
  modal: {
    width: 200,
    height: 200,
  },
});

export default SignUp3;
