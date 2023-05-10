import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderPages from "../Component/pagesHeader";
import Input from "../Component/input";
import AddImage from "../Component/addImage";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../color";
import Btn from "../Component/button";
import { updateUserApi } from "../api/updateUserApi";

function ProfilePage({ navigation, user }) {
  const [image, setImage] = useState(
    "http://192.168.1.13:3001/images/profile/" + user.profile.userProfileImage
  );
  const [email,setEmail] = useState(user.email);
  const [disableEmail ,setDisableEmail] = useState(true);
  const [phoneNumber,setPhoneNumber] = useState(user.profile.mobile);
  const [disableMobile , setDisableMobile] = useState(true);
  const back = () => {
    navigation.goBack();
  };

  const editEmail =() =>{
    setDisableEmail(!disableEmail);
  }
  const editMobile =() =>{
    setDisableMobile(!disableMobile);
  }

  const editBtn = () => {
    if ((!disableEmail && email!==user.email) || (!disableMobile && phoneNumber!==user.profile.mobile) ) {
        return true;
    }else{
        return false;
    }
  };

  const handleUpdate = () => {
    let editObject = {};
    if(!disableEmail && email!==user.email){
        editObject.email = email;
    }
    if(!disableMobile && phoneNumber!==user.profile.mobile){
        editObject.profile = {};
        editObject.profile.mobile =  phoneNumber ;
        editObject.profile.phone = phoneNumber ;
    }

    updateUserApi(JSON.stringify(editObject),user.id).then(result => {
        console.log('updated:', result.data);
        setDisableEmail(true);
        setDisableMobile(true);
    }).catch(err => {
        console.log(err);
    })
  };
  return (
    <View style={styles.container}>
        <ScrollView>
      <View style={styles.bar}>
        <HeaderPages label={"الصفحة الشخصية"} back={back}></HeaderPages>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>تفاصيل الحساب</Text>
        <View style={styles.info}>
          <AddImage
            image={image}
            setImage={setImage}
            edit={true}
            userId={user.id.toString()}
          ></AddImage>
          {/* <Text>الاسم</Text>
          <Text style={styles.infoValue}>{user.profile.name}</Text> */}
          <Input
            label={"الاسم"}
            value={user.profile.name}
            disable={true}
          ></Input>
          <Input
            label={"رقم الهوية"}
            value={user.id_number.toString()}
            disable={true}
          ></Input>
          <Input
            label={"تاريخ الميلاد"}
            value={user.profile.dateOfBirth.split("T")[0]}
            disable={true}
          ></Input>
          <View style={{ flexDirection: "row", justifyContent:'space-between', alignItems:'center' }}>
            <Input
              label={"الايميل"}
              value={email}
              disable={disableEmail}
              onChangeText={(email) => {setEmail(email)}}
              width="95%"
            ></Input>
            <Pressable style={styles.editBtn} onPress={editEmail}>
              <MaterialIcons name="edit" size={18} color={Colors.black} />
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", justifyContent:'space-between', alignItems:'center' }}>
            <Input
              label={"رقم المحمول"}
              value={phoneNumber}
              disable={disableMobile}
              onChangeText={(mobile) => {setPhoneNumber(mobile)}}
              width="95%"
            ></Input>
            <Pressable style={styles.editBtn} onPress={editMobile}>
              <MaterialIcons name="edit" size={18} color={Colors.black} />
            </Pressable>
          </View>
          {editBtn() ? <Btn value={'تثبيت التعديلات'} handler={handleUpdate}></Btn> : null}
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  bar: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  info: {
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  infoValue: {
    fontWeight: "bold",
  },
  editBtn:{
    // width:30,
    // height:30,
    // backgroundColor:Colors.darkGreen,
    alignItems:'center',
    justifyContent:'center',
  },
});

export default ProfilePage;
