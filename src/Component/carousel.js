import React, { useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel, {
  Pagination,
} from "react-native-snap-carousel-expo-46-compatible";
import NewsData from "../store/homePageStore";
import CarouselItem from "./carouselItem";
import Colors from "../color";
import { useEffect } from "react";
import { getAllNews } from "../api/getAllNews";

export const SLIDER_WIDTH = Dimensions.get("window").width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
function NewsCarousel() {
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([]);
  const isCarousel = useRef(null);

  useEffect(() => {
    getAllNews()
      .then((result) => {
        const newsData = result.data.map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            url: item.image,
          };
        });
        setNews(newsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={{ height: 235, marginTop: 10 }}>
      {news.length !== 0 ? (
        <Carousel
          ref={isCarousel}
          data={news}
          renderItem={CarouselItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
        />
      ) : null}
    </View>
  );
}
export default NewsCarousel;
