import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { getAllMyBookings } from "../api/getAllMyBookings";
import Colors from "../color";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { deleteBook } from "../api/deleteBook";
import HeaderPages from "../Component/pagesHeader";
import { getUserApi } from "../api/getUserApi";

function MyBookingsPage({ navigation,route }) {
  const { id } = route.params;
  const [bookings, setBookings] = useState([]);
  const [refersh, setRefresh] = useState(false);
  const [user,setUser] = useState(null);

  useEffect(() => {
    getUserApi(8)
      .then((result) => {
        setUser(result.data);
        if(result.data.role === 'BASIC') {
          gettingBookings();
        }else{
          setBookings(result.data.Booking);
        }
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        console.log('added bookings user id :', id,bookings );
      });
  }, [refersh]);

  const gettingBookings = () => {
    getAllMyBookings().then(result => {
      setBookings(result.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleDelete = (bookId) => {
    deleteBook(bookId)
      .then((result) => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRefresh(!refersh);
      });
  };

  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <HeaderPages back={back} label={"حجز موعد"}></HeaderPages>
      </View>
      {bookings.length === 0 ? (
        <Text>لا يوجد لديك حجوزات حتى الأن</Text>
      ) : (
        bookings.map((item, index) => {
          return (
            <>
              <View key={index}>
                { <Text>ساميه محمد فتحي سعد</Text> }
                <View style={styles.myAgenda}>
                  <View style={{ width: "40%", alignItems: "flex-start" }}>
                    <Text style={styles.agendaText}>{item.date}</Text>
                    <Text
                      style={[
                        styles.agendaText,
                        { fontWeight: "bold", fontSize: 9 },
                      ]}
                    >
                      {item.startTime + " - " + item.endTime}
                    </Text>
                  </View>
                  <View style={styles.divider}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Text style={styles.agendaInfo}>{item.description}</Text>

                    <Menu style={{ marginLeft: 20 }}>
                      <MenuTrigger
                        customStyles={{
                          triggerWrapper: {
                            top: 0,
                            right: 5,
                          },
                        }}
                      >
                        <Entypo
                          name="dots-three-vertical"
                          size={18}
                          color="grey"
                        />
                      </MenuTrigger>
                      <MenuOptions style={styles.menuOptions}>
                        <MenuOption
                          onSelect={() => {
                            handleDelete(item.id);
                          }}
                          text="حذف"
                        />
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
              </View>
            </>
          );
        })
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
  myAgenda: {
    marginVertical: 5,
    backgroundColor: Colors.lightVanilla1,
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkGreen,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
export default MyBookingsPage;
