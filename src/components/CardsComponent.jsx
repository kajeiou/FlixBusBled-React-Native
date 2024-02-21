// CardsComponent.js
import React from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const CardsComponent = ({ data }) => {
  const FeedCard = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedCard item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    height: 200,
    resizeMode: 'cover',
  },
  cardTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardsComponent;
