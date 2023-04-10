import React from "react";
import {
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import Colors from "../color";

function CarouselItem({ item }) {
  return (
    <View style={styles.card}>
      <Image
        style={{
          width: "100%",
          height: 230,
          borderRadius: 20,
        }}
        source={item.url}
      />
      <View style={styles.cardTxtContainer}>
        <Text style={styles.cardTxt}>{item.summary}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: Colors.lightVanilla1,
    // width: "100%",
    borderRadius: 20,
    elevation:3,
  },
  cardTxtContainer: {
    width:'100%',
    position: "absolute",
    left: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
    // backgroundColor: Colors.black,
    backgroundColor:  '#00000070',
  },
  cardTxt: {
    paddingVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
    
    color:'#FFFFFF'
  },
});
export default CarouselItem;
