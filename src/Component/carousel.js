import React, { useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel, {
  Pagination,
} from "react-native-snap-carousel-expo-46-compatible";
import NewsData from "../store/homePageStore";
import CarouselItem from "./carouselItem";
import Colors from "../color";

export const SLIDER_WIDTH = Dimensions.get("window").width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
function NewsCarousel() {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <View style={{ height:235,marginTop:10 }}>
        <Carousel
          ref={isCarousel}
          data={NewsData}
          renderItem={CarouselItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
        />
    </View>
  );
}
export default NewsCarousel;
