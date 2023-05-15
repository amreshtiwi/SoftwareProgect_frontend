import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { auth, db } from "../store/firebase";
import Colors from "../color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, View } from "react-native";
import HeaderPages from "../Component/pagesHeader";

function ChatPage({navigation, route }) {
  const [messages, setMessages] = useState([]);

  const { lawyerId , userId } = route.params;

  // set the chatroom ID
  const chatroomId = [userId, lawyerId].sort().join("_");

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(chatroomId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );

    return unsubscribe;
  }, [chatroomId]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  
    const {
      _id,
      createdAt,
      text,
      user,
    } = messages[0];
  
    // save the message to the chatroom
    db.collection("chats")
      .doc(chatroomId)
      .collection("messages")
      .add({
        _id,
        createdAt,
        text,
        user,
      });
  
    // save a reference to the chatroom in the chatrooms collection
    db.collection("chatrooms")
      .doc(chatroomId)
      .set({
        participants: [userId, lawyerId],
        lastMessage: {
          text,
          createdAt,
        },
      });
  }, [chatroomId]);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color={Colors.darkGreen}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.darkGreen,
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const back = () => {
    navigation.navigate("LawyerProfilePage");
  }; 
  return (
    <>
      <View style={styles.bar}>
        <HeaderPages label={"المحامي"} back={back}></HeaderPages>
      </View>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.uid, // set the user ID as the _id
          name: auth?.currentUser?.displayName,
          avatar: auth?.currentUser?.photoURL,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        placeholder="مراسلة"
      />
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    // marginBottom: 10,
    position: "absolute",
    top: 0,
  },
});
export default ChatPage;
