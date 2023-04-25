import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import Colors from "../color";
import Input from "./input";
import Btn from "./button";

function AddQuestion({ visible, hideModal }) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        <Text>قم بإضافة سؤال وسيتم الرد عليك من قبل محامون مختصون.</Text>
        <Input label={'إسأل'} multiline={true}></Input>
        <Btn value={'أرسل سؤالك'}></Btn>
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
