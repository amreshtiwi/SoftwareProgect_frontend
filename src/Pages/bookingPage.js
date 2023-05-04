import React, { useState } from "react";
import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import HeaderPages from "../Component/pagesHeader";
import Colors from "../color";
import { ScrollView } from "react-native-gesture-handler";
import AgendaMeettings from "../Component/AgendaMeetings";

function BookingPage({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");

  const back = () => {
    navigation.goBack();
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const bookAppointment = () => {
    // Add code to book appointment here
    console.log(`Booked appointment on ${selectedDate}`);
  };

  LocaleConfig.locales["ar"] = {
    monthNames: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    monthNamesShort: [
      "ينا",
      "فبر",
      "مار",
      "أبر",
      "ماي",
      "يون",
      "يول",
      "أغس",
      "سبت",
      "أكت",
      "نوف",
      "ديس",
    ],
    dayNames: [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    dayNamesShort: ["أحد", "اثن", "ثل", "أر", "خم", "جم", "سبت"],
  };

  LocaleConfig.defaultLocale = "ar";
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <HeaderPages back={back} label={"حجز موعد"}></HeaderPages>
      </View>

      <Text style={styles.calenderText}>قم بإختيار موعد مناسب عند المحامي</Text>
      <View style={{ width: "90%" }}>
        <Calendar
          onDayPress={onDayPress}
          style={styles.calender}
          theme={styles.calendarTheme}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: Colors.darkGreen,
            },
          }}
        />
      </View>
      {selectedDate !== "" && (
        <View style={{ height: Dimensions.get("window").height / 2.6, width:'100%'}}>
          <ScrollView style={{}}>
            <View style={{alignItems:'center'}}>
              <AgendaMeettings></AgendaMeettings>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // marginVertical: 20,
  },
  bar: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    // marginBottom: 10,
  },
  calenderText: {
    margin: 20,
    fontWeight: "bold",
  },
  calender: {
    width: "100%",
    borderRadius: 20,
  },
  calendarTheme: {
    backgroundColor: Colors.lightVanilla1,
    calendarBackground: Colors.lightVanilla1,
    textSectionTitleColor: Colors.darkGreen,
    selectedDayTextColor: Colors.black,
    selectedDayBackgroundColor: Colors.yellow,
    todayTextColor: Colors.darkGreen,
    arrowColor: Colors.yellow,
    indicatorColor: "red",
  },
});

export default BookingPage;
