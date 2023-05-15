import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import Colors from "../color";
import Input from "./input";
import Btn from "./button";
import { createPost } from "../api/createPostApi";

function AddQuestion({ visible, hideModal, postDoneModal, setPostDoneModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [caution, setCaution] = useState(false);

  const addQustion = () => {
    setCaution(false);
    if (title.length > 0 && description.length > 0) {
      const postObject = {
        title: title,
        description: description,
      };
      createPost(JSON.stringify(postObject))
        .then((result) => {
          setPostDoneModal(true);
          setTitle("");
          setDescription("");
          hideModal();
          setTimeout(() => {
            setPostDoneModal(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCaution(true);
    }
  };
  return (
    <Portal>
      <Modal
        visible={postDoneModal}
        contentContainerStyle={[styles.modal, { alignItems: "center" }]}
      >
        <Text>تم نشر سؤالك</Text>
      </Modal>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        <Text>قم بإضافة مشكلة أو سؤال وسيتم الرد عليك من قبل محامون مختصون.</Text>
        <Input
          label={"العنوان"}
          multiline={true}
          value={title}
          onChangeText={(title) => {
            setTitle(title);
          }}
        ></Input>
        <Input
          label={"وصف المشكلة / السؤال"}
          multiline={true}
          value={description}
          onChangeText={(description) => {
            setDescription(description);
          }}
        ></Input>
        {caution ? (
          <Text style={{ color: "red" }}>يرجى تعبئة جميع الفراغات</Text>
        ) : null}

        <Btn value={"نشر"} handler={addQustion}></Btn>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.lightVanilla,
    padding: 20,
  },
});
export default AddQuestion;
