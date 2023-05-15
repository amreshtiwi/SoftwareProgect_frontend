import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeaderPages from "../Component/pagesHeader";
import Colors from "../color";

function CreateTransactionPage({navigation, route, user }) {
  const { type } = route.params;
  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderPages label={type} back={back}></HeaderPages>
      <View>
        <Text>المنفذ له</Text>
      </View>
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
export default CreateTransactionPage;
