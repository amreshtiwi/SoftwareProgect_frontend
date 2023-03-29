import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import Colors from "../color";
import * as ImagePicker from "expo-image-picker";
import BottomSheetNavigation from "./bottomSheet";

function AddImage() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      toggleBottomNavigationView();
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      toggleBottomNavigationView();
    }
  };

  return (
    <>
      <Pressable onPress={toggleBottomNavigationView}>
        <View style={styles.imageConatainer}>
          <Image
            style={styles.image}
            source={
              image
                ? { uri: image }
                : require("frontend/assets/User-avatar.png")
            }
          />
          <View style={styles.imageBtn}>
            <Text
              style={{
                color: Colors.lightVanilla,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              إضافة صورة شخصية
            </Text>
          </View>
        </View>
      </Pressable>

      <BottomSheetNavigation
        visible={bottomSheetVisible}
        toggle={toggleBottomNavigationView}
        chooseFromLibrary={() => pickImageFromLibrary()}
        takePhoto={() => takePhoto()}
      ></BottomSheetNavigation>
    </>
  );
}

const styles = StyleSheet.create({
  imageConatainer: {
    justifyContent: "center",
    backgroundColor: Colors.lightVanilla1,
    borderRadius: 150,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  imageBtn: {
    backgroundColor: Colors.darkGreen,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
    position: "absolute",
    top: 110,
    right: 70,
    elevation: 10,
  },
});
export default AddImage;
