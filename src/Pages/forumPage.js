import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderPages from "../Component/pagesHeader";
import { Divider, Provider, Searchbar } from "react-native-paper";
import Colors from "../color";
import QuestionItem from "../Component/QustionItem";
import { Ionicons } from "@expo/vector-icons";
import AddQuestion from "../Component/addQuestion";
import SearchInput from "../Component/searchInput";

function ForumPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [addQuestionModalVisible, setAddQuestionModalVisible] = useState(false);

  const showModal = () => {
    setAddQuestionModalVisible(true);
  };
  const hideModal = () => {
    setAddQuestionModalVisible(false);
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  const back = () => {
    navigation.goBack();
  };

  return (
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
          <SearchInput onChangeSearch={onChangeSearch} searchQuery={searchQuery}></SearchInput>
        </View>
        <View style={{ alignItems: "center" }}>
          {data.map((item) => {
            return <QuestionItem key={item.id} item={item}></QuestionItem>;
          })}
        </View>
      </ScrollView>
      <View style={styles.addQuestionBtn}>
        <Pressable onPress={showModal}>
          <Ionicons name="add-circle" size={26} color={Colors.black} />
        </Pressable>
      </View>

      <AddQuestion visible={addQuestionModalVisible} hideModal={hideModal}></AddQuestion>
    </View>
    </Provider>
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

const data = [
  {
    id: 1,
    question: "السؤال الأول",
    answer:
      "نمببمتن منىبير منىري مىري منىي يمنبىيم منىبىمنىثب منيىبيىب منىةىيب منةىيب منةمنيب منةمنيىب منىيبمنىي منةمنيب منةىمنىيب منةىمنيب منةبمنيىب منةمىب منىمنىي مىيىي نةمنىب منةىمنىب منةىنمىب منةىنمىب نمنىب نةمنىب نةمنىبي منىمنىب نةنمىبي منىمنىيب ةمنشسمنى كمكسشةي كمنسكية كمةبيسش كمةبنةشسي كمةشسينب",
  },
  {
    id: 2,
    question: "السؤال الثاني",
    answer:
      "منبي نتبيمى منبىيتىب منىبيبى يتنىبيتىب منىبيىتب منىبيىب نتىبيتىب منىبيتىب ىبيىبي منىيتىبي مىتىيب متنىبيىب نىيتبي ىبيىتبي متنىببتيي منىبميى منىبيب مىبيىبي نةبيىبي الجواب الثاني",
  },
  { id: 3, question: "السؤال الثالث", answer: "الجواب الثالث" },
  // ... add more questions and answers here
];
export default ForumPage;
