import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text
} from "react-native";

export default function CustomCarousel({imageNames}) {
  const [selectedIndex, setselectedIndex] = useState(0);
  const scrollView = useRef();
  const height=500;
  const width= Dimensions.get("window").width
  console.log(imageNames)


  useEffect(() => {
    if (scrollView.current) {
      scrollView.current.scrollTo({
        animated: true,
        x: width * selectedIndex,
        y: 0,
      });
    }
  }, [selectedIndex]);

  const setIndex = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    setselectedIndex(Math.floor(contentOffset.x / viewSize.width));
  };

  if (imageNames.length > 0) {
    return (
      <View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={setIndex}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.carouselContainer}>
          {imageNames.map((imageName, key) => (
            <TouchableOpacity
              key={key}
              activeOpacity={0.8}
              style={[styles.imageContainer, { height, width }]}
            >
              <Image source={imageName} style={[styles.image, { height }]} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Text style={styles.carouselText}>{imageNames.length} médias</Text>
    </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  carousalContainer: {
    flexDirection: "row",
    width: "100%",

  },
  imageContainer: { backgroundColor: "white" },

  image: {
    width: "100%",
    height: "100%",
  },
  carouselText: {
    fontSize: 10,
    color: '#999999',
    padding:4,
    textAlign:'center'

  }
});
