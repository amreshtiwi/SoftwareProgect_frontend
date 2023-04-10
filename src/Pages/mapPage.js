import React, { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Colors from "../color";
import Btn from "../Component/button";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "../constants";
import HeaderPages from "../Component/pagesHeader";
import { Entypo } from "@expo/vector-icons";

function MapPage({ navigation }) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 32.813,
    longitude: 35.423,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerCoordination, setMarkerCoordination] = useState(null);
  const [directionBtnVisible, setDirectionBtnVisible] = useState(false);
  const [direction, setDirection] = useState(false);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("pls grand permission");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    setLocation(currentLocation);
    setRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };



  const getCoordinate = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoordination({ latitude, longitude });
    setDirectionBtnVisible(true);
  };

  const getDirection = () => {
    setDirection(true);
  };

  const back = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <MapView
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
        onPress={() => {
          setDirectionBtnVisible(false);
          setDirection(false);
        }}
        region={region}
        showsUserLocation={true}
        showsScale={true}
        showsCompass={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{ latitude: 32.23669, longitude: 35.21885 }}
          title="محكمه"
          description="محكمة بداية وصلح نابلس"
          pinColor={Colors.darkGreen}
          icon={require("frontend/assets/court.png")}
          onPress={getCoordinate}
        />
        {direction && location !== null ? (
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={markerCoordination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor={Colors.darkGreen}
          />
        ) : null}
      </MapView>

      <View style={styles.bar}>
        <HeaderPages
          back={back}
          label={"خريطة المحاكم والمحامون"}
        ></HeaderPages>

        <View
          style={{
            flexDirection: "row",
            width: Dimensions.get("window").width,
          }}
        >
          <Pressable onPress={getLocationPermission}>
            <View
              style={styles.myLocationBtn}
            >
              <Entypo name="location" size={24} color={Colors.black} />
            </View>
          </Pressable>
        </View>
      </View>
      {directionBtnVisible ? (
        <View style={styles.directionBtn}>
          <Btn value={"الإتجاهات"} handler={getDirection}></Btn>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  directionBtn: {
    position: "absolute",
    bottom: 0,
    right: 10,
    width: "95%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    width: Dimensions.get("window").width,
    position: "absolute",
    top: 0,
    alignItems: "center",
  },
  myLocationBtn:{
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  }
});
export default MapPage;
