import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../color";
import { useEffect } from "react";
import { getUserApi } from "../api/getUserApi";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";

const Comment = ({ commentValue }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();
    setIsLoading(true); // set isLoading to true when API call starts

    getUserApi(commentValue.authorId)
      .then((result) => {
        if (isMounted) {
          setUser(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // set isLoading to false when API call completes
      });

    return () => {
      isMounted = false;
      source.cancel("Component unmounted");
      // Cancel any ongoing API requests here
    };
  }, []);
  return (
    <>
      {!isLoading ? (
        <View style={styles.commentContainer}>
          <Image
            source={
              user.profile.userProfileImage
                ? {
                    uri:
                      "http://192.168.1.13:3001/images/profile/" +
                      user.profile.userProfileImage,
                  }
                : require("../../assets/user.png")
            }
            style={styles.commentImage}
          />
          <View style={styles.comentTextContainer}>
            <Text style={styles.commentName}>{user.profile.name}</Text>
            <Text style={styles.commentText}>{commentValue.data}</Text>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  commentImage: {
    width: 25,
    height: 25,
    borderRadius: 30,
  },
  comentTextContainer: {
    backgroundColor: Colors.lightVanilla1,
    width: "90%",
    borderRadius: 20,
    padding: 5,
  },
  commentText: {
    paddingHorizontal: 10,
    fontSize: 14,
  },
  commentName: {
    paddingHorizontal: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
});

export default Comment;
