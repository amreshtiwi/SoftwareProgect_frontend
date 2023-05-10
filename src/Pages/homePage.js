import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../color";
import Header from "../Component/header";
import HomeBtns from "../Component/HomeBtns";
import NewsCarousel from "../Component/carousel";
import {
  FontAwesome,
  Entypo,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { getUserApi } from "../api/getUserApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { updateUserApi } from "../api/updateUserApi";

function HomePage({ navigation, user }) {
  const [latitude, setLatitude] = useState(user.latitude);
  const [longitude, setLongitude] = useState(user.longitude);

  const navigateMapPage = () => {
    navigation.navigate("MapPage");
  };

  const navigateForumPage = () => {
    navigation.navigate("ForumPage");
  };

  const navigateLawyerPage = () => {
    navigation.navigate("LawyerStack", {
      latitude: latitude,
      longitude: longitude
    });
  };

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("pls grand permission");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });


    let editLocationObject = {};
    editLocationObject.latitude = currentLocation.coords.latitude;
    editLocationObject.longitude = currentLocation.coords.longitude;

    updateUserApi(JSON.stringify(editLocationObject),user.id).then(result => {
      console.log('updated:', result.data);
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
  }).catch(err => {
      console.log(err);
  })
  };

  useEffect(() => {
    getLocationPermission();
  },[]);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        name={"أهلاً " + user.profile.name.split(" ")[0]}
      ></Header>
      <NewsCarousel></NewsCarousel>
      {latitude === null && longitude === null ? (
        <View style={styles.locationCaution}>
          <View style={{flexDirection:'row'}}>
            <Pressable onPress={() => {getLocationPermission().catch(err => {console.log(err);})}}><Text style={{color:Colors.darkGreen, fontWeight:'900'}}>إضغط</Text></Pressable>
            <Text> لتحديد موقعك لإستفادة من خدمات الموقع</Text>
          </View>
        </View>
      ) : null}
      <View style={styles.btnsContainer}>
        <HomeBtns label={"خريطة"} handler={navigateMapPage}>
          {" "}
          <FontAwesome name="map-marker" size={24} color={Colors.darkGreen} />
        </HomeBtns>
        <HomeBtns label={"المعاملات"}>
          {" "}
          <Entypo
            name="text-document-inverted"
            size={24}
            color={Colors.darkGreen}
          />
        </HomeBtns>
        <HomeBtns label={"المحامون"} handler={navigateLawyerPage}>
          <FontAwesome5
            name="balance-scale"
            size={24}
            color={Colors.darkGreen}
          />
        </HomeBtns>
        <HomeBtns label={"المنتدى"} handler={navigateForumPage}>
          {" "}
          <MaterialIcons name="forum" size={24} color={Colors.darkGreen} />
        </HomeBtns>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    marginHorizontal: 5,
    // flex: 1,
    alignItems: "center",
    backgroundColor: Colors.lightVanilla,
  },
  btnsContainer: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  locationCaution: {
    backgroundColor: Colors.lightVanilla1,
    borderWidth: 2,
    width: "90%",
    height: 35,
    borderColor: Colors.yellow,
    borderRadius: 20,
    alignItems:'center',
    justifyContent:'center'
  },
});
export default HomePage;
