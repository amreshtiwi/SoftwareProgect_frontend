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
import Input from "../../Component/input";
import { Divider } from "react-native-paper";
import Btn from "../../Component/button";
import * as Print from "expo-print";
import { createTransaction } from "../../api/createTransactionApi";

function ReleaseCar({ navigation, route, user }) {
  const { type } = route.params;

  const [userExcutionForArray, setUserExcutionForArray] = useState([
    {
      nameId: Math.random().toString(),
      Namevalue: user.profile.name,
      idId: Math.random().toString(),
      IdValue: user.id_number.toString(),
    },
  ]);

  const createTransactionHandler = async () => {
    const userExcuteFor = [];

    for (const obj of userExcutionForArray) {
      const nameValue = obj.Namevalue;
      const idValue = obj.IdValue;

      userExcuteFor.push(`${nameValue}/${idValue}`);
    }
    const userExcutionForResult = userExcuteFor.join(", ");

    const transactionObject = {
      title: type ,
      description: "طلب فك حجز مركبة",
      type: "TYPE2",
      data: {
        userExcutionForResult:  userExcutionForResult ,
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
        <h1>فك حجز مركبة</h1>
        <p>القضية التنفيذية </p>
        <p>حضر المنفذ ضده بالذات ${userExcutionForResult} وطلب فك الحجز عن المركبة وفقاً لأحكام المادة (1/96) من قانون التنفيذ النافذ, حيث أنه لم يتم إتخاذ أي إجراء أو بيع على المركبة المحجوز عليها, وعليه تم التوقيع</p>
        
        <br></br>
        <br></br>

        <br></br>
        <div style="display: flex; justify-content: space-between;">
            <p><strong>المنفذ ضده</strong></p>
            <p><strong>مأمور التنفيذ</strong></p>
        </div>
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
                {/* منفذ له */}

                <View style={styles.excutedForheader}>
                  <Text>المنفذ له</Text>
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
export default ReleaseCar;
