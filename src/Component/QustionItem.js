import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../color";
import { Divider, Modal, Portal } from "react-native-paper";

import FadedText from "./fadedText";
import { ScrollView } from "react-native-gesture-handler";
import Comment from "./comment";
import { getUserApi } from "../api/getUserApi";

function QuestionItem({ item }) {
  const [visible, setVisble] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const getDays = () => {
    const qustionDate = new Date(item.created);
    const today = new Date();
    const differenceInTime = today.getTime() - qustionDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const showModal = () => {
    getUserApi(item.authorId)
      .then((result) => {
        setUserInfo(result.data);
        setVisble(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hideModal = () => {
    setVisble(false);
  };
  return (
    <>
      <Portal>
        {userInfo ? (
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.userInfo}>
                  <Image
                    source={
                      userInfo.profile.userProfileImage
                        ? {
                            uri:
                              "http://192.168.1.13:3001/images/profile/" +
                              userInfo.profile.userProfileImage,
                          }
                        : require("../../assets/user.png")
                    }
                    style={styles.image}
                  />
                  <Text style={styles.userName}>{userInfo.profile.name}</Text>
                </View>
                <Text style={styles.qustionDate}>
                  {getDays() == 0
                    ? "اليوم"
                    : getDays() == 1
                    ? "اليوم الماضي"
                    : "أيام" + getDays() + "قبل "}
                </Text>
              </View>
              <Divider style={styles.divider}></Divider>

              <View>
                <Text style={styles.questionText}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
              <Divider style={styles.divider}></Divider>
              <View style={styles.comments}>
                <Text>التعليقات</Text>
                <ScrollView>
                  <Comment></Comment>
                  <Comment></Comment>

                </ScrollView>
              </View>
            </View>
          </Modal>
        ) : null}
      </Portal>
      <View style={styles.itemContainer}>
        <View style={styles.titleBar}>
          <Text style={styles.questionText}>{item.title}</Text>
          <Text style={styles.qustionDate}>
            {getDays() == 0
              ? "اليوم"
              : getDays() == 1
              ? "اليوم الماضي"
              : "أيام" + getDays() + "قبل "}
          </Text>
        </View>

        <Divider bold={true} style={{ backgroundColor: Colors.darkGreen }} />
        <View>
          <FadedText text={item.description} numberOfLines={4}></FadedText>
          <Pressable onPress={showModal}>
            <Text style={styles.commentLabel}>قراءة التفاصيل ...</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.lightVanilla1,
    borderRadius: 20,
    width: "95%",
    elevation: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qustionDate: {
    color: "gray",
    fontSize: 10,
  },
  commentLabel: {
    color: Colors.darkGreen,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  modal: {
    backgroundColor: Colors.lightVanilla,
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 10,
  },
  comments: {
    marginVertical: 10,
    maxHeight: 300,
  },
  commentContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  commentImage: {
    width: 25,
    height: 25,
    borderRadius: 30,
  },
  comentTextContainer: {
    backgroundColor: Colors.lightVanilla1,
    width: "90%",
    borderRadius: 20,
  },
  commentText: {
    padding: 10,
    fontSize: 14,
  },
});
export default QuestionItem;
// userInfo.profile.userProfileImage
// ? {
//     uri:
//       "http://192.168.1.13:3001/images/profile/" +
//       userInfo.profile.userProfileImage,
//   }
// :

// {userInfo.profile.name.split(" ")[0] +
// " " +
// userInfo.profile.name.split(" ")[1]}
