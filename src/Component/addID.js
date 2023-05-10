import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../color";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function AddID({image, setImage}) {
  // const [image, setImage] = useState(null);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable style={{ width: "100%" }} onPress={() => takePhoto()}>
      <View style={styles.addIDBtn}>
        {image && <Image style={styles.imageID} source={{ uri: image }} />}
        <Text>إلتقط صورة لهويتك</Text>
        <AntDesign
          name="pluscircle"
          size={20}
          color={Colors.darkGreen}
          style={{ marginVertical: 10 }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addIDBtn: {
    backgroundColor: Colors.lightVanilla1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    height: 150,
    borderRadius: 20,
    borderColor: Colors.darkGreen,
    borderWidth: 1,
  },
  imageID: {
    position: "absolute",
    width: "100%",
    height: 147,
    borderRadius: 20,
    opacity: 0.4,
  },
});
export default AddID;
