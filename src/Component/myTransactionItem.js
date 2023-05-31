import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../color";
import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import { exutionRequestTemplate } from "../store/transactionTemplates/excutionRequest";
import { releaseCarTemplate } from "../store/transactionTemplates/releaseCar";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { deleteTransactionApi } from "../api/deleteTransaction";
import { reciptPaymentTemplate } from "../store/transactionTemplates/receiptPayment";
import { reserveCarTemplate } from "../store/transactionTemplates/reserveCar";
import { leaveClaimTemplate } from "../store/transactionTemplates/leaveClaim";
import { reNotifyTemplate } from "../store/transactionTemplates/re-notify";
import { reserveBankTemplate } from "../store/transactionTemplates/reserveBank";
import { detentionRequestTemplate } from "../store/transactionTemplates/detentionRequest";
import { refferalMedicalCommitee } from "../store/transactionTemplates/referralMedicalComitte";
import { Chip } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function MyTransactionItem({ item, refresh, handleReresh }) {
  const deleteTransaction = () => {
    if (item.status === "APPROVED") {
      Toast.show({
        type: "info",
        text1: "عزيزي المواطن",
        text2: "لا يمكن حذف المعاملات المثبته",
      });
    } else {
      deleteTransactionApi(item.id)
        .then((result) => {
          console.log("delete:", result.data);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          handleReresh(!refresh);
          Toast.show({
            type: "info",
            text1: "عزيزي المواطن",
            text2: "عزيزي المواطن تم حذف المعاملة بنجاح",
          });
        });
    }
  };
  const showTransaction = async () => {
    let html = "";
    if (item.title === "طلب تنفيذ") {
      html = exutionRequestTemplate(item.data);
    } else if (item.title === "فك حجز مركبة") {
      html = releaseCarTemplate(item.data);
    } else if (item.title === "طلب إقرار إستلام دفعة") {
      html = reciptPaymentTemplate(item.data);
    } else if (item.title === "حجز مركبة") {
      html = reserveCarTemplate(item.data);
    } else if (item.title === "طلب ترك دعوى") {
      html = leaveClaimTemplate(item.data);
    } else if (item.title === "إعادة تبليغ") {
      html = reNotifyTemplate(item.data);
    } else if (item.title === "طلب حجز بنوك") {
      html = reserveBankTemplate(item.data);
    } else if (item.title === "طلب حبس") {
      html = detentionRequestTemplate(item.data);
    } else if (item.title === "إحالة للجنة الطبية") {
      html = refferalMedicalCommitee(item.data);
    }
    try {
      const { uri } = await Print.printToFileAsync({ html: html });

      await Print.printAsync({ uri });
    } catch (error) {
      console.error("Error generating or displaying PDF:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={showTransaction}>
        <View style={styles.myTransactionItem}>
          <Ionicons
            style={styles.tabIcon}
            name="newspaper-sharp"
            size={36}
            color={Colors.darkGreen}
          />
          <Text style={styles.tabTitle}>{item.description}</Text>
          {item.status === "WAITTING" ? (
            <Text
              style={[
                styles.statusStyle,
                { backgroundColor: Colors.yellow, color: Colors.black },
              ]}
            >
              قيد التثبيت
            </Text>
          ) : item.status === "APPROVED" ? (
            <Text
              style={[
                styles.statusStyle,
                { backgroundColor: Colors.darkGreen },
              ]}
            >
              تم الموافقة
            </Text>
          ) : (
            <Text style={[styles.statusStyle, { backgroundColor: "#DC3545" }]}>
              مرفوضة
            </Text>
          )}
        </View>
      </Pressable>

      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              top: 0,
              right: 5,
            },
          }}
        >
          <Entypo name="dots-three-vertical" size={18} color="grey" />
        </MenuTrigger>
        <MenuOptions style={styles.menuOptions}>
          <MenuOption
            style={styles.menuOption}
            onSelect={() => alert(`Save`)}
            text="تعديل"
          />
          <MenuOption onSelect={deleteTransaction} text="حذف" />
        </MenuOptions>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    height: 60,
    backgroundColor: Colors.lightVanilla1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: Colors.darkGreen,
  },
  myTransactionItem: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
  },
  tabIcon: {
    marginHorizontal: 5,
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  menu: {
    backgroundColor: Colors.lightVanilla,
  },
  menuOptions: {
    backgroundColor: Colors.lightVanilla,
  },
  menuOption: {
    fontSize: 16,
  },
  statusStyle: {
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: 10,
    color: Colors.lightVanilla1,
    marginHorizontal: 5,
    fontSize: 9,
  },
});
export default MyTransactionItem;
