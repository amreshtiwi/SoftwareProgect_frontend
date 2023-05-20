import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../color";
import { Divider } from "react-native-paper";

function AgendaMeettings({ date,lawyerId, userId,lawyer=false,agendaData}) {

  return agendaData.map((item) => {
    if ((item.date == date) && (item.lawyerId == lawyerId)) {
      return (
        <View key={item.id} style={styles.myAgenda}>
          <View style={{width:'40%',alignItems:'flex-start'}}>
            <Text style={styles.agendaText}>{date}</Text>
            <Text style={[styles.agendaText, { fontWeight: "bold", fontSize:9 }]}>
              {item.startTime + ' - ' + item.endTime}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.agendaInfo}>{lawyer || item.userId == userId ? item.description : 'محجوز'}</Text>
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
    elevation:5
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
});
export default AgendaMeettings;
