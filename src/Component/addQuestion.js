import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import Colors from "../color";
import Input from "./input";
import Btn from "./button";
import { createPost } from "../api/createPostApi";
import { updatePost } from "../api/updatePost";

function AddQuestion({
  visible,
  hideModal,
  postDoneModal,
  setPostDoneModal,
  update = false,
  updateTitle = "",
  updateDescrption = "",
  id = 0,
}) {
  const [title, setTitle] = useState(updateTitle);
  const [description, setDescription] = useState(updateDescrption);
  const [caution, setCaution] = useState(false);

  const addQustion = () => {
    setCaution(false);
    if (title.length > 0 && description.length > 0) {
      const postObject = {
        title: title,
        description: description,
      };

      if (update) {
        console.log(update);
        updatePost(
          JSON.stringify({
            title: title,
            description: description,
          }),
          id
        )
          .then((result) => {
            setPostDoneModal(true);
            setTitle("");
            setDescription("");
            hideModal();
            setTimeout(() => {
              setPostDoneModal(false);
            }, 1500);
          })
          .catch((err) => console.log(err));
      } else {
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
      }
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
        {update ? <Text>تم تعديل سؤالك</Text> : <Text>تم نشر سؤالك</Text>}
      </Modal>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        <Text>
          قم بإضافة مشكلة أو سؤال وسيتم الرد عليك من قبل محامون مختصون.
        </Text>
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

        <Btn value={update ? "نعديل" : "نشر"} handler={addQustion}></Btn>
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
