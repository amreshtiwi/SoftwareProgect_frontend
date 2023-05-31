import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../color";
import { Divider } from "react-native-paper";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { deleteBook } from "../api/deleteBook";
import { useState } from "react";

function AgendaMeettings({ date, userId, lawyer = false, agendaData }) {

  const [bookings, setBookings] = useState(agendaData);

  const handleDelete = (bookId) => {

    let UpdatedBook = [] ;
    deleteBook(bookId).then(result => {
      UpdatedBook = bookings.filter(item => {
        return item.bookId !== bookId;
      });
      console.log('books', UpdatedBook);
      
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setBookings(UpdatedBook);
    })
  }

  return bookings.map((item, index) => {
    if (item.date == date) {
      return (
        <View key={index} style={styles.myAgenda}>
          <View style={{ width: "40%", alignItems: "flex-start" }}>
            <Text style={styles.agendaText}>{date}</Text>
            <Text
              style={[styles.agendaText, { fontWeight: "bold", fontSize: 9 }]}
            >
              {item.startTime + " - " + item.endTime}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'nowrap'}}>
            <Text style={styles.agendaInfo}>
              {lawyer || item.userId == userId ? item.description : "محجوز"}
            </Text>

            {item.userId == userId ? (
              <Menu style={{marginLeft:20}}>
                <MenuTrigger
                  customStyles={{
                    triggerWrapper: {
                      top: 0,
                      right: 5,
                    },
                  }}
                >
                  <Entypo name="dots-three-vertical" size={18} color="grey" />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                  <MenuOption onSelect={() => {handleDelete(item.id)}} text="حذف" />
                </MenuOptions>
              </Menu>
            ) : null}
          </View>
        </View>
      );
    }
  });
}

const styles = StyleSheet.create({
  myAgenda: {
    marginVertical: 5,
    backgroundColor: Colors.lightVanilla1,
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkGreen,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  agendaText: {
    marginVertical: 3,
    marginHorizontal: 10,
  },
  agendaInfo: {
    marginHorizontal: 20,
  },
  divider: {
    backgroundColor: Colors.darkGreen,
    width: 2,
    height: "80%",
  },
  menu: {
    backgroundColor: Colors.lightVanilla,
  },
  menuOptions: {
    backgroundColor: Colors.lightVanilla,
  },
  menuOption: {
    fontSize: 16,
  },
});
export default AgendaMeettings;
