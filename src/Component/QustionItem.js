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
import Input from "./input";
import Btn from "./button";
import { FontAwesome } from "@expo/vector-icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { deletePost } from "../api/deletePostApi";
import AddQuestion from "./addQuestion";

function QuestionItem({ item, user, refersh, handleRefresh }) {
  const [visible, setVisble] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [updateModalVisibale, setUpdateModalVisible] = useState(false);
  const [postDoneModal, setPostDoneModal] = useState(false);

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

  const addComment = () => {
    if (!user.profile.accountIsActivated) {
      Toast.show({
        type: "info",
        text1: "عزيزي المحامي",
        text2: "لا يمكنك إضافة تعليق حتى يتم تثبيت الحساب",
      });
    }
  };

  const handleDeletePost = () => {
    deletePost(item.id)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        hideModal();
        handleRefresh(!refersh);
        Toast.show({
          type: "info",
          text1: "عزيزي المواطن",
          text2: "تم حذف السؤال بنجاح",
        });
      });
  };

  const hideUpdateModal = () => {
    setUpdateModalVisible(false);
    setVisble(true);
  };

  const showUpdateModal = () => {
    setUpdateModalVisible(true);
    setVisble(false);
  };



  return (
    <>
      <AddQuestion
        visible={updateModalVisibale}
        hideModal={hideUpdateModal}
        postDoneModal={postDoneModal}
        setPostDoneModal={setPostDoneModal}
        update={true}
        updateTitle={item.title}
        updateDescrption={item.description}
      ></AddQuestion>
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

                <Pressable onPress={hideModal}>
                  <Text style={styles.closeModalText}>إغلاق</Text>
                </Pressable>
                <Text
                  style={[
                    styles.qustionDate,
                    { position: "absolute", right: 0, bottom: 0 },
                  ]}
                >
                  {getDays() == 0
                    ? "اليوم"
                    : getDays() == 1
                    ? "اليوم الماضي"
                    : "قبل " + getDays() + " أيام"}
                </Text>
              </View>
              <Divider style={styles.divider}></Divider>

              <View>
        
                {user.id === userInfo.id  ? (
                  <Menu>
                    <MenuTrigger
                              customStyles={{
                                triggerWrapper: {
                                  top: 0,
                                  right:0,
                                },
                              }}>
                      <Entypo
                        name="dots-three-vertical"
                        size={18}
                        color="grey"
                      />
                    </MenuTrigger>
                    <MenuOptions style={styles.menuOptions}>
                      <MenuOption
                        style={styles.menuOption}
                        onSelect={showUpdateModal}
                        text="تعديل"
                      />
                      <MenuOption onSelect={handleDeletePost} text="حذف" />
                    </MenuOptions>
                  </Menu>
                ) : null}
                <Text style={styles.questionText}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
              <Divider style={styles.divider}></Divider>
              <View style={styles.comments}>
                <Text>التعليقات</Text>
                <ScrollView>
                  {item.comments.map((comment, index) => {
                    return (
                      <Comment key={index} commentValue={comment}></Comment>
                    );
                  })}
                  {/* <Comment ></Comment>
                  <Comment></Comment> */}
                </ScrollView>
                {user.role === "LAWYER" ? (
                  <View style={styles.addComment}>
                    <Input label={"إضافة تعليق"} width="88%"></Input>
                    <Pressable
                      style={styles.addCommentButton}
                      onPress={addComment}
                    >
                      <FontAwesome name="send" size={20} color={Colors.black} />
                    </Pressable>
                  </View>
                ) : null}
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
              : "قبل " + getDays() + " أيام"}
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
  addComment: {
    flexDirection: "row",
    alignItems: "center",
    // height:60,
    // backgroundColor:Colors.lightVanilla1,
  },
  addCommentButton: {
    width: "10%",
    height: 45,
    // backgroundColor:Colors.lightVanilla1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeModalText: {
    fontWeight: "bold",
    color: Colors.darkGreen,
    position: "absolute",
    right: -10,
    top: -10,
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
