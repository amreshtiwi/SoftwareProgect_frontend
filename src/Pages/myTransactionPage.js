import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderPages from "../Component/pagesHeader";
import Colors from "../color";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { getMyTransaction } from "../api/getMyTransaction";
import { ActivityIndicator } from "react-native-paper";
import MyTransactionItem from "../Component/myTransactionItem";
import { MenuProvider } from "react-native-popup-menu";

function MyTransactionPage({navigation}) {
  const [myTransaction, setMyTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();
    if (isFocused) {
      setIsLoading(true); // set isLoading to true when API call starts

      getMyTransaction()
        .then((result) => {
          if (isMounted) {
            setMyTransaction(result.data);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false); // set isLoading to false when API call completes
        });
    }

    return () => {
      isMounted = false;
      source.cancel("Component unmounted");
      // Cancel any ongoing API requests here
    };
  }, [isFocused]);

  const back = () => {
    navigation.goBack();
  };
  return (
    <MenuProvider>
    <View style={styles.container}>
      <HeaderPages label={"معاملاتي"} back={back}></HeaderPages>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.darkGreen} />
      ) : myTransaction.length !== 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}  style={{ width: "90%", marginVertical: 10,height:Dimensions.get('window').height-90 }}>
            {myTransaction.map((item) => {
                return (
                    <MyTransactionItem key={item.id} item={item}></MyTransactionItem>
                );
            })}
        </ScrollView>
      ) : <View><Text>لا يوجد معاملات حتى الأن</Text></View>}
    </View>
    </MenuProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: Colors.lightVanilla,
  },
});
export default MyTransactionPage;
