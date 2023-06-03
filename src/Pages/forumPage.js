import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderPages from "../Component/pagesHeader";
import { ActivityIndicator, Provider, Switch } from "react-native-paper";
import Colors from "../color";
import QuestionItem from "../Component/QustionItem";
import { Ionicons } from "@expo/vector-icons";
import AddQuestion from "../Component/addQuestion";
import SearchInput from "../Component/searchInput";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { getAllPost } from "../api/getAllPostsApi";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { MenuProvider } from "react-native-popup-menu";

function ForumPage({ navigation, user }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postDoneModal, setPostDoneModal] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [refersh, setRefersh] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();
    if (isFocused) {
      setIsLoading(true); // set isLoading to true when API call starts

      getAllPost()
        .then((result) => {
          if (isMounted) {
            if (isSwitchOn) {
              setPosts(result.data.filter((item) => item.authorId == user.id));
            } else {
              setPosts(result.data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false); // set isLoading to false when API call completes
        });
    }

    return () => {
      isMounted = false;
      source.cancel("Component unmounted");
      // Cancel any ongoing API requests here
    };
  }, [isFocused, postDoneModal, isSwitchOn, refersh]);

  const showModal = () => {
    if (!user.profile.accountIsActivated) {
      Toast.show({
        type: "info",
        text1: "عزيزي المواطن",
        text2: "لا يمكنك النشر حتى يتم تثبيت الحساب",
      });
    } else {
      setAddQuestionModalVisible(true);
    }
  };
  const hideModal = () => {
    setAddQuestionModalVisible(false);
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  const back = () => {
    navigation.goBack();
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleRefersh = (refersh) => {
    setRefersh(refersh);
  };

  const handleEdit = (title, description) => {};
  return (
    <MenuProvider>
      <Provider>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ marginTop: 20 }}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
          >
            <View style={styles.bar}>
              <HeaderPages label={"المنتدى"} back={back}></HeaderPages>
            </View>

            <View style={{ backgroundColor: Colors.lightVanilla }}>
              <SearchInput
                onChangeSearch={onChangeSearch}
                searchQuery={searchQuery}
              ></SearchInput>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Switch
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  color={Colors.darkGreen}
                />
                <Text>أسئلتي</Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              {isLoading ? (
                <View>
                  <ActivityIndicator size="large" color={Colors.darkGreen} />
                </View>
              ) : posts !== null ? (
                posts.map((item) => {
                  return (
                    <QuestionItem
                      key={item.id}
                      item={item}
                      user={user}
                      refersh={refersh}
                      handleRefresh={handleRefersh}
                    ></QuestionItem>
                  );
                })
              ) : (
                <View>
                  <Text>لا يوجد أسئلة حتى الأن</Text>
                </View>
              )}
            </View>
          </ScrollView>
          <View style={styles.addQuestionBtn}>
            <Pressable onPress={showModal}>
              <Ionicons name="add-circle" size={26} color={Colors.black} />
            </Pressable>
          </View>

          <AddQuestion
            visible={addQuestionModalVisible}
            hideModal={hideModal}
            postDoneModal={postDoneModal}
            setPostDoneModal={setPostDoneModal}
          ></AddQuestion>
        </View>
      </Provider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    marginBottom: 10,
    // elevation: 10,
    // zIndex:1,
    // backgroundColor:Colors.lightVanilla
  },
  addQuestionBtn: {
    backgroundColor: Colors.yellow,
    position: "absolute",
    bottom: 0,
    left: 0,
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});

export default ForumPage;
