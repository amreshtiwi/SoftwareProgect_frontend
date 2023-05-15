import React, { useState, useEffect } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../store/firebase";
import Colors from "../color";
import HeaderPages from "../Component/pagesHeader";
import { getUserApi } from "../api/getUserApi";
import ChatListItem from "../Component/chatListItem";

function ChatList({ navigation, user }) {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chatrooms")
      .where("participants", "array-contains", user.id)
      .onSnapshot((snapshot) =>
        setChatrooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            participants: doc.data().participants,
            lastMessage: doc.data().lastMessage,
          }))
        )
      );

    return unsubscribe;
  }, []);



  const back = () => {
    navigation.goBack();
  };
  return (
    <View >
      <View style={styles.bar}>
        <HeaderPages label={"المحادثات"} back={back}></HeaderPages>
      </View>
      {/* <FlatList
        data={chatrooms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      /> */}
      <ScrollView style={{width:'100%'}} contentContainerStyle={{ alignItems:'center'}}>
        {chatrooms.map(item => {
            return (<ChatListItem key={item.id} item={item} userId={user.id} navigation={navigation}></ChatListItem>)
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    bar: {
        width: Dimensions.get("window").width,
        alignItems: "center",
        marginBottom: 10,
      },
  chatItem: {
    padding: 10,
    backgroundColor: Colors.lightVanilla1,
    width: "90%",
  },
});
export default ChatList;
// import React from "react";
// import { Text, View } from "react-native";

// function ChatList() {
//   return (
//     <View>
//       <Text>ChatList</Text>
//     </View>
//   );
// }
// export default ChatList;
