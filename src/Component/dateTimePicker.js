import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "./input";

function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateValue, setDateValue] = useState("تاريخ الميلاد");


  const showPicker = () => {
    setShow(true);
  };

  const hidePicker = () => {
    setShow(false);
  }

  const handleConfirm = (date) => {
    setDate(date);
    setDateValue(date.toLocaleDateString());
    setShow(false);
  }
  return (
    <>
      <Pressable style={{ width: "100%" }} onPress={showPicker}>
        <Input label={dateValue} disable={true}></Input>
      </Pressable>
      <DateTimePickerModal isVisible={show} mode="date" onConfirm={handleConfirm} onCancel={hidePicker}/>
    </>
  );
}

export default DatePicker;
