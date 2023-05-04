import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderPages from "../Component/pagesHeader";
import Colors from "../color";
import { Entypo, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import QuestionItem from "../Component/QustionItem";

function LawyerProfilePage({ navigation, name }) {
  const scrollY = new Animated.Value(0);

  const handleCallButtonPress = () => {
    Linking.openURL("tel:1234567890");
  };
  const back = () => {
    navigation.goBack();
  };

  const NavigatebookingPage = () => {
    navigation.navigate("BookingPage");
  }
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

      {/* <Animated.View></Animated.View> */}

      <Animated.View
        style={[
          styles.contentContainer,
          {
            marginTop: scrollY.interpolate({
              inputRange: [0, 250],
              outputRange: [250, 0],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <View style={styles.actionBar}>
          <View style={styles.actionBtn}>
            <Entypo name="chat" size={24} color={Colors.black} />
          </View>
          <Pressable onPress={NavigatebookingPage}>
          <View style={styles.actionBtn}>
            <FontAwesome
              name="calendar-plus-o"
              size={24}
              color={Colors.black}
            />
          </View>
          </Pressable>
          <View style={styles.actionBtn}>
            <Ionicons
              name="ios-location-sharp"
              size={24}
              color={Colors.black}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={[
              styles.circleStyle,
              { borderBottomStartRadius: 0, borderTopStartRadius: 0 },
            ]}
          ></View>
          <View
            style={[
              styles.circleStyle,
              { width: 35, borderBottomEndRadius: 0, borderTopEndRadius: 0 },
            ]}
          ></View>

          <View style={{ position: "absolute", left: 50 }}>
            <View style={[styles.infoContainer]}>
              <View style={styles.infoIcon}>
                <AntDesign name="user" size={24} color={Colors.black} />
              </View>
              <Text style={styles.infoText}>المحامي أحمد محمد</Text>
            </View>

            <View style={[styles.infoContainer]}>
              <Pressable
                onPress={handleCallButtonPress}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View style={styles.infoIcon}>
                  <FontAwesome name="phone" size={24} color={Colors.black} />
                </View>
                <Text style={styles.infoText}>0595141904</Text>
              </Pressable>
            </View>

            <View style={[styles.infoContainer]}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="md-location-sharp"
                  size={24}
                  color={Colors.black}
                />
              </View>
              <Text style={styles.infoText}>نابلس, شارع سفيان</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: Dimensions.get("window").height / 2,
            marginTop: 10,
            width: "100%",
          }}
        >
          <ScrollView
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            style={{ width: "100%" }}
          >
            <View style={{alignItems:'center'}}>
              {data.map((item) => {
                return <QuestionItem key={item.id} item={item}></QuestionItem>;
              })}
            </View>
          </ScrollView>
        </View>
      </Animated.View>
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
    // marginTop: 250,
    // height: "100%",
    width: "100%",
    // backgroundColor:'red'
  },
  circleStyle: {
    width: 70,
    height: 150,
    backgroundColor: Colors.darkGreen,
    elevation: 10,
    // borderTopRightRadius: 150,
    // borderBottomRightRadius: 150,
    // marginTop:50,
    borderRadius: 20,
  },
  infoContainer: {
    flexDirection: "row",
    // position: "absolute",
    // left: 40,
    // backgroundColor: "red",
    width: "100%",
    alignItems: "center",
    marginVertical: 3,
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
{
  /* <View style={styles.actionBar}>
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
</View> */
}
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
  {
    id: 4,
    question: "السؤال الأول",
    answer:
      "نمببمتن منىبير منىري مىري منىي يمنبىيم منىبىمنىثب منيىبيىب منىةىيب منةىيب منةمنيب منةمنيىب منىيبمنىي منةمنيب منةىمنىيب منةىمنيب منةبمنيىب منةمىب منىمنىي مىيىي نةمنىب منةىمنىب منةىنمىب منةىنمىب نمنىب نةمنىب نةمنىبي منىمنىب نةنمىبي منىمنىيب ةمنشسمنى كمكسشةي كمنسكية كمةبيسش كمةبنةشسي كمةشسينب",
  },
  {
    id: 5,
    question: "السؤال الأول",
    answer:
      "نمببمتن منىبير منىري مىري منىي يمنبىيم منىبىمنىثب منيىبيىب منىةىيب منةىيب منةمنيب منةمنيىب منىيبمنىي منةمنيب منةىمنىيب منةىمنيب منةبمنيىب منةمىب منىمنىي مىيىي نةمنىب منةىمنىب منةىنمىب منةىنمىب نمنىب نةمنىب نةمنىبي منىمنىب نةنمىبي منىمنىيب ةمنشسمنى كمكسشةي كمنسكية كمةبيسش كمةبنةشسي كمةشسينب",
  },
  {
    id: 6,
    question: "السؤال الأول",
    answer:
      "نمببمتن منىبير منىري مىري منىي يمنبىيم منىبىمنىثب منيىبيىب منىةىيب منةىيب منةمنيب منةمنيىب منىيبمنىي منةمنيب منةىمنىيب منةىمنيب منةبمنيىب منةمىب منىمنىي مىيىي نةمنىب منةىمنىب منةىنمىب منةىنمىب نمنىب نةمنىب نةمنىبي منىمنىب نةنمىبي منىمنىيب ةمنشسمنى كمكسشةي كمنسكية كمةبيسش كمةبنةشسي كمةشسينب",
  },
  // ... add more questions and answers here
];
