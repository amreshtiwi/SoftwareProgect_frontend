import React, { useEffect, useState } from "react";
import { View, Text, Button, Dimensions, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import HeaderPages from "../Component/pagesHeader";
import Colors from "../color";
import { ScrollView } from "react-native-gesture-handler";
import AgendaMeettings from "../Component/AgendaMeetings";
import { MaterialIcons } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import AddTime from "../Component/addTime";
import { Provider } from "react-native-paper";
import { getBookings } from "../api/getBooks";
import { MenuProvider } from "react-native-popup-menu";

function BookingPage({ navigation, route }) {
  const { Bookings, id, user } = route.params;
  const [selectedDate, setSelectedDate] = useState("");
  const [addTimeModalVisible, setAddTimeModalVisible] = useState(false);
  const [agendaData, setAgendaData] = useState([]);
  const today = new Date();

  useEffect(() => {
    setAgendaData(Bookings);
    console.log(Bookings);
  }, []);

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

  const showModal = () => {
    setAddTimeModalVisible(true);
  };

  const hideModal = () => {
    setAddTimeModalVisible(false);
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
    <MenuProvider>
      <Provider>
        <View style={styles.container}>
          <View style={styles.bar}>
            <HeaderPages back={back} label={"حجز موعد"}></HeaderPages>
          </View>

          {id !== "0" ? (
            <Text style={styles.calenderText}>
              قم بإختيار موعد مناسب عند المحامي
            </Text>
          ) : null}
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
            <>
              <View
                style={{
                  height: Dimensions.get("window").height / 2.6,
                  width: "100%",
                }}
              >
                <ScrollView>
                  <View style={{ alignItems: "center" }}>
                    <AgendaMeettings
                      date={selectedDate}
                      agendaData={agendaData}
                      handleSetAgenda={setAgendaData}
                      userId={user.id}
                    ></AgendaMeettings>
                  </View>
                </ScrollView>
              </View>
              {id !== "0" ? (
                new Date(selectedDate) < today ? null : (
                  <Pressable style={styles.chooseTime} onPress={showModal}>
                    <Text style={styles.chooseTimeText}>احجز موعد</Text>
                    <MaterialIcons
                      name="alarm-add"
                      size={24}
                      color={Colors.black}
                    />
                  </Pressable>
                )
              ) : null}

              <AddTime
                visible={addTimeModalVisible}
                hideModal={hideModal}
                date={selectedDate}
                agendaData={agendaData}
                handleSetAgenda={setAgendaData}
                id={id}
              ></AddTime>
            </>
          )}
        </View>
      </Provider>
    </MenuProvider>
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
    marginTop:20
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
  chooseTime: {
    width: 150,
    height: 50,
    position: "absolute",
    bottom: 20,
    left: Dimensions.get("window").width / 3.5,
    backgroundColor: Colors.yellow,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    flexDirection: "row",
  },
  chooseTimeText: {
    fontWeight: "bold",
    marginHorizontal: 5,
  },
});

export default BookingPage;
