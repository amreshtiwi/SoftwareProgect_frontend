import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderPages from "../../Component/pagesHeader";
import Colors from "../../color";
import AddBtn from "../../Component/addBtn";
import DropDownList from "../../Component/dropDownList";
import Input from "../../Component/input";
import { Divider } from "react-native-paper";
import DatePicker from "../../Component/dateTimePicker";
import Btn from "../../Component/button";
import * as Print from "expo-print";
import { createTransaction } from "../../api/createTransactionApi";

function ExcutionRequset({ navigation, route, user }) {
  const { type } = route.params;
  const [excution, setExcuion] = useState("");

  const [userExcutionForArray, setUserExcutionForArray] = useState([
    {
      nameId: Math.random().toString(),
      Namevalue: user.profile.name,
      idId: Math.random().toString(),
      IdValue: user.id_number.toString(),
    },
  ]);

  const [userExcutionOnArray, setUserExcutionOnArray] = useState([
    {
      nameId: Math.random().toString(),
      Namevalue: "",
      idId: Math.random().toString(),
      IdValue: "",
    },
  ]);
  const [amountClaim, setAmountClaim] = useState("");
  const [claimDate, setClaimDate] = useState("");
  const [EDate, setDate] = useState(new Date());

  const handleButtonAddExcuionFor = (isAddition) => {
    if (isAddition) {
      const newUserExcutionFor = {
        nameId: Math.random().toString(),
        Namevalue: "",
        idId: Math.random().toString(),
        IdValue: "",
      };
      setUserExcutionForArray([...userExcutionForArray, newUserExcutionFor]);
    } else {
      const newArray = [...userExcutionForArray];
      newArray.pop();
      setUserExcutionForArray(newArray);
    }
  };

  const handleButtonAddExcuionOn = (isAddition) => {
    if (isAddition) {
      const newUserExcutionOn = {
        nameId: Math.random().toString(),
        Namevalue: "",
        idId: Math.random().toString(),
        IdValue: "",
      };
      setUserExcutionOnArray([...userExcutionOnArray, newUserExcutionOn]);
    } else {
      const newArray = [...userExcutionOnArray];
      newArray.pop();
      setUserExcutionOnArray(newArray);
    }
  };

  const handleNameChange = (text, id, on) => {
    if (!on) {
      const index = userExcutionForArray.findIndex(
        (item) => item.nameId === id
      );
      const newArray = [...userExcutionForArray];
      newArray[index].Namevalue = text;
      setUserExcutionForArray(newArray);
    } else {
      const index = userExcutionOnArray.findIndex((item) => item.nameId === id);
      const newArray = [...userExcutionOnArray];
      newArray[index].Namevalue = text;
      setUserExcutionOnArray(newArray);
    }
  };

  const handleIDChange = (text, id, on) => {
    if (!on) {
      const index = userExcutionForArray.findIndex((item) => item.idId === id);
      const newArray = [...userExcutionForArray];
      newArray[index].IdValue = text;
      setUserExcutionForArray(newArray);
    } else {
      const index = userExcutionOnArray.findIndex((item) => item.idId === id);
      const newArray = [...userExcutionOnArray];
      newArray[index].IdValue = text;
      setUserExcutionOnArray(newArray);
    }
  };

  const createTransactionHandler = async () => {
    const userExcuteFor = [];
    const userExcuteOn = [];

    for (const obj of userExcutionForArray) {
      const nameValue = obj.Namevalue;
      const idValue = obj.IdValue;

      userExcuteFor.push(`${nameValue}/${idValue}`);
    }
    const userExcutionForResult = userExcuteFor.join(", ");

    for (const obj of userExcutionOnArray) {
      const nameValue = obj.Namevalue;
      const idValue = obj.IdValue;

      userExcuteOn.push(`${nameValue}/${idValue}`);
    }
    const userExcutionOnResult = userExcuteOn.join(", ");
    const excutionOrder = excution == "0" ? "كمبيالة" : "شيك";

    const transactionObject = {
      title: type ,
      description: "طلب معاملة تنفيذ",
      type: "TYPE1",
      data: {
        excutionOrder:  excutionOrder ,
        userExcutionForResult:  userExcutionForResult ,
        userExcutionOnResult:  userExcutionOnResult ,
        amountClaim:  amountClaim ,
        claimDate:  claimDate ,
      },
    };

    createTransaction(transactionObject)
      .then((result) => {
        console.log("transaction created:", result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const html = `
    <html dir="rtl" lang="ar">
      <body>
        <h1>طلب تنفيذ</h1>
        <p>المحكمة التي أصدر الحكم <strong>${excutionOrder}</strong></p>
        <p>المنفذ له :</p>
        <span>${userExcutionForResult}</span>
        <br></br>
        <p>المنفذ عليه :</p>
        <span>${userExcutionOnResult}</span>
        <br></br>
        <p>المحكوم به:</p>
        <span>${amountClaim}</span>
        <span>بموجب ${excutionOrder} </span>
        <span>مستحق ومحرر بتاريخ ${claimDate}</span>
        <p>طلب تنفيذ إعلام الحكم المبين أعلاه لدى دائرة التنفيذ وعليه سطرت ورقة الإخبار إلى المنفذ عليه بعد استيفاء الرسم القانوني حسب الأصول </p>
      </body>
    </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: html });

      await Print.printAsync({ uri });
    } catch (error) {
      console.error("Error generating or displaying PDF:", error);
    }
    // generatePdf(  'amora' ,'amoratv', '123123123' );
  };
  const back = () => {
    navigation.goBack();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ width: "100%", alignItems: "center", flex: 1 }}
      >
        <HeaderPages label={type} back={back}></HeaderPages>
        <ScrollView
          style={{
            width: "100%",
            height: Dimensions.get("window").height - 100,
            flex: 1,
          }}
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        >
          <View style={styles.container}>
            <View style={styles.transactionPageForm}>
              <View style={styles.excutedFor}>
                <DropDownList
                  placeholder="طلب التنفيذ لـِ"
                  type={"TYPE1"}
                  setSelected={(val) => {
                    setExcuion(val);
                  }}
                />

                {/* منفذ له */}

                <View style={styles.excutedForheader}>
                  <Text>المنفذ له</Text>
                  <AddBtn
                    label="إضافة منفذ له"
                    handler={() => handleButtonAddExcuionFor(true)}
                    iconName={"add-circle-sharp"}
                  ></AddBtn>
                  {userExcutionForArray.length > 1 ? (
                    <AddBtn
                      label="إزاله"
                      handler={() => handleButtonAddExcuionFor(false)}
                      iconName={"ios-remove-circle-sharp"}
                      buttonColor={Colors.darkGreen}
                      textColor={Colors.lightVanilla1}
                    ></AddBtn>
                  ) : null}
                </View>

                {userExcutionForArray.map((textInputData, index) => (
                  <View key={textInputData.nameId}>
                    <Input
                      key={textInputData.nameId}
                      value={textInputData.Namevalue}
                      onChangeText={(text) =>
                        handleNameChange(text, textInputData.nameId, false)
                      }
                      label={"منفذ له رقم " + (index + 1)}
                      disable={index === 0 ? true : false}
                    />

                    <Input
                      key={textInputData.idId}
                      value={textInputData.IdValue}
                      onChangeText={(text) =>
                        handleIDChange(text, textInputData.idId, false)
                      }
                      label={"رقم هوية المنفذ له"}
                      disable={index === 0 ? true : false}
                      keyboardType="numeric"
                    />
                  </View>
                ))}

                <Divider></Divider>

                {/* منفذ عليه */}
                <View style={styles.excutedForheader}>
                  <Text>المنفذ عليه</Text>
                  <AddBtn
                    label="إضافة منفذ عليه"
                    handler={() => handleButtonAddExcuionOn(true)}
                    iconName={"add-circle-sharp"}
                  ></AddBtn>
                  {userExcutionOnArray.length > 1 ? (
                    <AddBtn
                      label="إزاله"
                      handler={() => handleButtonAddExcuionOn(false)}
                      iconName={"ios-remove-circle-sharp"}
                      buttonColor={Colors.darkGreen}
                      textColor={Colors.lightVanilla1}
                    ></AddBtn>
                  ) : null}
                </View>

                {userExcutionOnArray.map((textInputData, index) => (
                  <View key={textInputData.nameId}>
                    <Input
                      key={textInputData.nameId}
                      value={textInputData.Namevalue}
                      onChangeText={(text) =>
                        handleNameChange(text, textInputData.nameId, true)
                      }
                      label={"منفذ عليه رقم " + (index + 1)}
                    />

                    <Input
                      key={textInputData.idId}
                      value={textInputData.IdValue}
                      onChangeText={(text) =>
                        handleIDChange(text, textInputData.idId, true)
                      }
                      label={"رقم هوية المنفذ عليه"}
                      keyboardType="numeric"
                    />
                  </View>
                ))}
                <Divider></Divider>

                <Input
                  label={"مبلغ الإستحقاق"}
                  placeholder="2000 دينار"
                  value={amountClaim}
                  onChangeText={(amountClaim) => {
                    setAmountClaim(amountClaim);
                  }}
                ></Input>
                <DatePicker
                  label="تاريخ الاستحقاق"
                  value={claimDate}
                  setValue={setClaimDate}
                  setDate={setDate}
                ></DatePicker>
                <Btn
                  value={"إنشاء معاملة"}
                  handler={createTransactionHandler}
                ></Btn>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: Colors.lightVanilla,
    width: "100%",
  },
  transactionPageForm: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  excutedFor: {
    width: "90%",
    // backgroundColor:'red'
  },
  excutedForheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default ExcutionRequset;
