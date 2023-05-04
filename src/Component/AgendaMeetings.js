import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../color";

function AgendaMeettings() {
    
  return (

      <View style={styles.myAgenda}>
        <Text style={styles.agendaText}>20-5-2023</Text>
        <Text style={[styles.agendaText,{fontWeight:'bold'}]}>9:15 - 9:40</Text>
      </View>

  );
}

const styles = StyleSheet.create({
  myAgenda: {
    marginVertical:10,
    backgroundColor: Colors.lightVanilla1,
    width:'90%',
    borderRadius:10,
    borderWidth:1,
    borderColor:Colors.darkGreen,
    
  },
  agendaText:{
    marginVertical:3,
    marginHorizontal:10
  }
});
export default AgendaMeettings;
