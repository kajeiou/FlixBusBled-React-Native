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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollView = useRef();
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (scrollView.current) {
      scrollView.current.scrollTo({
        animated: true,
        x: screenWidth * selectedIndex,
        y: 0,
      });
    }
  }, [selectedIndex]);

  const setIndex = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    setSelectedIndex(Math.floor(contentOffset.x / viewSize.width));
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
          style={{ width: screenWidth, height: screenWidth }}
        >
          {imageURIs.map((imageName, key) => (
            <TouchableOpacity
              key={key}
              activeOpacity={0.8}
              style={{ width: screenWidth, height: screenWidth }}
            >
              <Image source={{ uri: imageName }} style={{ width: "100%", height: "100%" }} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.carouselText}>{imageURIs.length} média(s)</Text>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  carouselText: {
    fontSize: 10,
    color: '#999999',
    padding: 4,
    textAlign: 'center'
  }
});
