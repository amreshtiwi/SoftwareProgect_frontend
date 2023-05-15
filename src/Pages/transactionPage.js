import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeaderPages from "../Component/pagesHeader";
import Colors from "../color";
import { ScrollView } from "react-native-gesture-handler";
import TransactionItem from "../Component/transactionItem";

function TransactionPage({navigation}) {
    const back = () => {
        navigation.goBack();
      };
      const NavigationDoingTransaction = (type) => {
        navigation.navigate("createTransaction",{
            type:type,
        })
      }
  return (
    <View style={styles.container}>
            <HeaderPages label={"المعاملات"} back={back}></HeaderPages>
            <ScrollView style={{width:'95%',marginVertical:10}}>
                <TransactionItem type={'طلب تنفيذ'} handler={NavigationDoingTransaction}/>
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: "center",
        backgroundColor: Colors.lightVanilla,
      },
})
export default TransactionPage;
