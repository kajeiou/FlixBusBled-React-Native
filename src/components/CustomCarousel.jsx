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

export default function CustomCarousel({imageURIs}) {
  const [selectedIndex, setselectedIndex] = useState(0);
  const scrollView = useRef();
  const height=500;
  const width= Dimensions.get("window").width


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

  if (imageURIs.length > 0) {
    return (
      <View>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={setIndex}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
          <View style={styles.carousalContainer}>
            {imageURIs.map((imageURI, key) => (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                style={[styles.imageContainer, { height, width }]}
              >
                <Image source={{ uri: imageURI }} style={[styles.image, { height }]} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Text style={styles.carouselText}>{imageURIs.length} médias</Text>
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
