import {
  StyleSheet,
  View,
} from "react-native";
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

function HomePage({ navigation, name = "أهلاً فلان" }) {

  const navigateMapPage = () =>{
    navigation.navigate("MapPage");
  };

  const navigateForumPage = () => {
    navigation.navigate("ForumPage");
  } 
  return (
    <View style={styles.container}>
      <Header navigation={navigation} name={name}></Header>
      <NewsCarousel></NewsCarousel>
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
        <HomeBtns label={"المحامون"}>
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
});
export default HomePage;
