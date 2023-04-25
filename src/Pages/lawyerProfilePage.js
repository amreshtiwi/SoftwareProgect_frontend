import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import HeaderPages from "../Component/pagesHeader";
import Colors from "../color";
import { Entypo, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";

function LawyerProfilePage({ navigation, name }) {
  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/myPic.png")} style={styles.image} />
      <View style={styles.bar}>
        <HeaderPages
          back={back}
          label={"المحامي أحمد محمود"}
          backgroundColor={null}
        ></HeaderPages>
      </View>
      <View style={styles.contentContainer}>


        <View style={{width:'100%'}}>
          {/* <View style={styles.circleStyle}>green half circuit</View> */}

          <View style={[styles.infoContainer]}>
            <View style={styles.infoIcon}>
              <AntDesign name="user" size={24} color={Colors.black} />
            </View>
            <Text style={styles.infoText}>المحامي أحمد محمد</Text>
          </View>

          <View style={[styles.infoContainer]}>
            <View style={styles.infoIcon}>
              <FontAwesome name="phone" size={24} color={Colors.black} />
            </View>
            <Text style={styles.infoText}>0595141904</Text>
          </View>

          <View style={[styles.infoContainer]}>
            <View style={styles.infoIcon}>
              <Ionicons name="md-location-sharp" size={24} color={Colors.black} />
            </View>
            <Text style={styles.infoText}>نابلس, شارع سفيان</Text>
          </View>
        </View>

        
      </View>
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
  imageContanier: {
    width: 210,
    height: 210,
    borderRadius: 200,
    backgroundColor: Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
  },
  image: {
    width: "100%",
    position: "absolute",
    top: 0,
    // height: 200,
    // borderRadius: 200,
    elevation: 10,
  },
  actionBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginVertical: 20,
    // backgroundColor: Colors.darkGreen,
  },
  actionBtn: {
    backgroundColor: Colors.yellow,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
    elevation: 10,
  },
  contentContainer: {
    backgroundColor: Colors.lightVanilla,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 250,
    height: "100%",
    width:'100%'
  },
  circleStyle: {
    width: 100,
    height: 200,
    backgroundColor: Colors.darkGreen,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 150,
    // marginTop:50,
  },
  infoContainer: {
    flexDirection: "row",
    position: "absolute",
    // left: 40,
    // backgroundColor: "red",
    width: "100%",
    alignItems: "center",
  },
  infoIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.yellow,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
export default LawyerProfilePage;
{/* <View style={styles.actionBar}>
<View style={styles.actionBtn}>
  <Entypo name="chat" size={24} color={Colors.black} />
</View>
<View style={styles.actionBtn}>
  <FontAwesome
    name="calendar-plus-o"
    size={24}
    color={Colors.black}
  />
</View>
<View style={styles.actionBtn}>
  <Ionicons
    name="ios-location-sharp"
    size={24}
    color={Colors.black}
  />
</View>
</View> */}