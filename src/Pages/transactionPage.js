import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import HeaderPages from "../Component/pagesHeader";
import Colors from "../color";
import { ScrollView } from "react-native-gesture-handler";
import TransactionItem from "../Component/transactionItem";
import { Ionicons } from "@expo/vector-icons";

function TransactionPage({ navigation }) {
  const back = () => {
    navigation.goBack();
  };
  const NavigationDoingTransaction = (type) => {
    navigation.navigate("createTransaction", {
      type: type,
    });
  };

  const navigateMyTransactioPage = () => {
    navigation.navigate("myTransaction");
  };
  return (
    <>
      <View style={styles.container}>
        <HeaderPages label={"المعاملات"} back={back}></HeaderPages>
        <ScrollView style={{ width: "95%", marginVertical: 10 }}>
          <TransactionItem
            type={"طلب تنفيذ"}
            handler={NavigationDoingTransaction}
          />
          <TransactionItem
            type={"فك حجز مركبة"}
            handler={NavigationDoingTransaction}
          />
          <TransactionItem
            type={"حجز مركبة"}
            handler={NavigationDoingTransaction}
          />
          <TransactionItem
            type={"طلب إقرار إستلام دفعة"}
            handler={NavigationDoingTransaction}
          />
          <TransactionItem
            type={"طلب ترك دعوى"}
            handler={NavigationDoingTransaction}
          />
          <TransactionItem
            type={"إعادة تبليغ"}
            handler={NavigationDoingTransaction}
          />
          <TransactionItem
            type={"طلب حجز بنوك"}
            handler={NavigationDoingTransaction}
          />
          <TransactionItem
            type={"طلب حبس"}
            handler={NavigationDoingTransaction}
          />
          <TransactionItem
            type={"إحالة للجنة الطبية"}
            handler={NavigationDoingTransaction}
          />
        </ScrollView>
      </View>
      <Pressable
        style={styles.myTransactioBtn}
        onPress={navigateMyTransactioPage}
      >
        <Ionicons name="newspaper-sharp" size={24} color={Colors.black} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: Colors.lightVanilla,
  },
  myTransactioBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.yellow,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TransactionPage;
