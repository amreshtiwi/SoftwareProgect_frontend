import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "./input";

function DatePicker({value,setValue,setDate,label='تاريخ الميلاد'}) {
  // const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);


  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-')
    );
  }

  const showPicker = () => {
    setShow(true);
  };

  const hidePicker = () => {
    setShow(false);
  }

  const handleConfirm = (date) => {
    setDate(date);
    setValue(formatDate(date));
    setShow(false);
  }
  return (
    <>
      <Pressable style={{ width: "100%" }} onPress={showPicker}>
        <Input label={label} disable={true} value={value}></Input>
      </Pressable>
      <DateTimePickerModal isVisible={show} mode="date" onConfirm={handleConfirm} onCancel={hidePicker}/>
    </>
  );
}

export default DatePicker;
