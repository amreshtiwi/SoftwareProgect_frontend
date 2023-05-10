import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";
import HeaderPages from "../Component/pagesHeader";
import SearchInput from "../Component/searchInput";
import LawyerTab from "../Component/lawyerTab";
import { getLawyersApi } from "../api/getLawyers";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../color";

function LawyersPage({ navigation, latitude, longitude }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allLawyers, setAllLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // new state variable
  const isFocused = useIsFocused();

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();
    if (isFocused) {
      setIsLoading(true); // set isLoading to true when API call starts
      let locationObject = {
        location: {
          longitude: Number(longitude),
          latitude: Number(latitude),
        },
      };

      getLawyersApi(JSON.stringify(locationObject))
        .then((result) => {
          if (isMounted) {
            setAllLawyers(result.data);
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
  }, [isFocused]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  const back = () => {
    navigation.goBack();
  };

  const navigateLawyerProfile = (id) => {
    navigation.navigate("LawyerProfileStack", {
      id: id,
    });
  };

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

        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.darkGreen} />
        ) : allLawyers.length === 0 ? (
          <Text>ليس هناك محاميين بعد</Text>
        ) : (
          <>
            <View>
              <SearchInput
                searchQuery={searchQuery}
                onChangeSearch={onChangeSearch}
              ></SearchInput>
            </View>

            <View style={{ alignItems: "center", width: "100%" }}>
              {allLawyers.map((items) => {
                return (
                  <LawyerTab
                    key={items.id}
                    id={items.id}
                    name={items.profile.name}
                    city={items.profile.city}
                    address={items.profile.address}
                    image={items.profile.userProfileImage}
                    handler={navigateLawyerProfile}
                  />
                );
              })}
            </View>
          </>
        )}
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
