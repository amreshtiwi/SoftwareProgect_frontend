import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Colors from "../color";
import Input from "./input";
import Btn from "./button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import moment from "moment";
import { createBooking } from "../api/createBooking";

function AddTime({ visible, hideModal, date, agendaData , handleSetAgenda ,id }) {
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] =
    useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

  const [startTimeconflict, setStartTimeConflict] = useState(false);
  const [endTimeConflict, setEndTimeConflict] = useState(false);

  const showStartTimePicker = () => setIsStartTimePickerVisible(true);
  const hideStartTimePicker = () => setIsStartTimePickerVisible(false);
  const handleStartTimeConfirm = (time) => {
    let momentStart = moment(format(time, "h:mm a"), "h:mm a");
    let selectedStartTime = momentStart.toDate();
    let selectedStart = selectedStartTime.toLocaleTimeString();

    for (let i = 0; i < agendaData.length; i++) {
      if (agendaData[i].date == date) {
        const arrayMomentStart = moment(agendaData[i].startTime, "h:mm a");
        const arrayStartTime = arrayMomentStart.toDate();
        const arrayStart = arrayStartTime.toLocaleTimeString();

        const arrayMomentEnd = moment(agendaData[i].endTime, "h:mm a");
        const arrayEndTime = arrayMomentEnd.toDate();
        const arrayEnd = arrayEndTime.toLocaleTimeString();
        if (selectedStart >= arrayStart && selectedStart < arrayEnd) {
          setStartTimeConflict(true);
          break;
        } else {
          setStartTimeConflict(false);
          setStartTime(format(time, "h:mm a"));
          break;
        }
      } else {
        setStartTime(format(time, "h:mm a"));
      }
    }
    if (agendaData.length === 0) {
      setStartTime(format(time, "h:mm a"));
    }
    hideStartTimePicker();
  };

  const showEndTimePicker = () => setIsEndTimePickerVisible(true);
  const hideEndTimePicker = () => setIsEndTimePickerVisible(false);
  const handleEndTimeConfirm = (time) => {
    let momentEnd = moment(format(time, "h:mm a"), "h:mm a");
    let selectedEndTime = momentEnd.toDate();
    let selectedEnd = selectedEndTime.toLocaleTimeString();

    for (let i = 0; i < agendaData.length; i++) {
      if (agendaData[i].date == date) {
        const arrayMomentStart = moment(agendaData[i].startTime, "h:mm a");
        const arrayStartTime = arrayMomentStart.toDate();
        const arrayStart = arrayStartTime.toLocaleTimeString();

        const arrayMomentEnd = moment(agendaData[i].endTime, "h:mm a");
        const arrayEndTime = arrayMomentEnd.toDate();
        const arrayEnd = arrayEndTime.toLocaleTimeString();

        if (selectedEnd > arrayStart && selectedEnd <= arrayEnd) {
          setEndTimeConflict(true);
          break;
        } else {
          setEndTimeConflict(false);
          setEndTime(format(time, "h:mm a"));
          console.log("endTime time:", time);
          console.log("endTime:", format(time, "h:mm a"));
          break;
        }
      } else {
        setEndTime(format(time, "h:mm a"));
        console.log("endTime time:", time);
        console.log("endTime", format(time, "h:mm a"));
      }
    }
    if (agendaData.length === 0) {
      setEndTime(format(time, "h:mm a"));
    }

    hideEndTimePicker();
  };

  const handleBooking = () => {
    const bookingsData = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      description: description,
      lawyerId: Number(id),
    };

    const updatedBookings = [...agendaData];
    

    createBooking(JSON.stringify(bookingsData)).then(result => {
      updatedBookings.push(result.data);
    }).catch(err => console.error(err)).finally(() => {
      handleSetAgenda(updatedBookings);
      hideModal();
    });
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modal}
      >
        <Text>حدد الوقت الذي تريده في هذا التاريخ</Text>
        <Input label={"التاريخ"} disable={true} value={date}></Input>
        <Input
          label={"الوصف"}
          value={description}
          onChangeText={(value) => {
            setDescription(value);
          }}
        ></Input>
        <View style={styles.timeView}>
          <Pressable
            style={styles.timeViewComponent}
            onPress={showStartTimePicker}
          >
            <Input
              label={"من"}
              value={startTime}
              width={"95%"}
              disable={true}
            ></Input>
          </Pressable>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleStartTimeConfirm}
            onCancel={hideStartTimePicker}
            
          />
          <Pressable
            style={[styles.timeViewComponent, { alignItems: "flex-end" }]}
            onPress={showEndTimePicker}
          >
            <Input
              label={"إلى"}
              value={endTime}
              width={"95%"}
              disable={true}
            ></Input>
          </Pressable>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleEndTimeConfirm}
            onCancel={hideEndTimePicker}
          />
        </View>
        {startTimeconflict || endTimeConflict ? (
          <Text style={{ color: "red" }}>الموعد متعارض مع المواعيد الاخرى</Text>
        ) : null}
        {startTime !== "" && endTime !== "" && description !== "" && (
          <Btn value={"أحجز"} handler={handleBooking}></Btn>
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.lightVanilla,
    padding: 20,
  },
  timeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeViewComponent: {
    width: "50%",
  },
});
export default AddTime;
