import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../color";
import { useEffect, useState } from "react";
import { getUserApi } from "../api/getUserApi";

const ChatListItem = ({ navigation ,item, userId }) => {
  const otherParticipant = item.participants.find(
    (participant) => participant !== userId
  );

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserApi(otherParticipant)
      .then((result) => {
        setUserData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [otherParticipant]);

  const openChatPage = () => {
    navigation.navigate("chat",{
        lawyerId: otherParticipant , 
        userId: userId
    })
  }
  return (
    <Pressable style={{width:'100%',alignItems:'center'}} onPress={openChatPage}>
    <View style={styles.chatItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={
            userData
              ? {
                  uri:
                    "http://192.168.1.13:3001/images/profile/" +
                    userData.profile.userProfileImage,
                }
              : require("../../assets/user.png")
          }
          style={styles.image}
        />
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {userData ? userData.profile.name : "محامي"}
          </Text>
          <Text style={{ color: "gray", fontSize: 11 }}>
            {item.lastMessage.text}
          </Text>
        </View>
      </View>
    </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    backgroundColor: Colors.lightVanilla1,
    width: "90%",
    borderRadius: 10,
    borderWidth:1,
    borderColor:Colors.darkGreen
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
});
export default ChatListItem;
