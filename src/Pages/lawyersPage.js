import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import HeaderPages from "../Component/pagesHeader";
import SearchInput from "../Component/searchInput";
import LawyerTab from "../Component/lawyerTab";

function LawyersPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  const back = () => {
    navigation.goBack();
  };

  const navigateLawyerProfile = () =>{
    navigation.navigate("LawyerProfileStack");
  }
  return (
    <View>
      <ScrollView
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <View style={styles.bar}>
          <HeaderPages label={"المحامون"} back={back}></HeaderPages>
        </View>

        <View>
          <SearchInput
            searchQuery={searchQuery}
            onChangeSearch={onChangeSearch}
          ></SearchInput>
        </View>

        <View style={{ alignItems: "center", width:'100%'}}>
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />

          <LawyerTab handler={navigateLawyerProfile} />

          <LawyerTab handler={navigateLawyerProfile} />

          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />
          <LawyerTab handler={navigateLawyerProfile} />


        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    marginBottom: 10,
  },
});
export default LawyersPage;
