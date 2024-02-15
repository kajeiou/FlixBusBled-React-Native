import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SafeAreaView, StyleSheet, Text } from 'react-native';
const Tab = createMaterialTopTabNavigator();

export default function TabHome() {
  return (
    <SafeAreaView style={styles.container}>
     <Text>Home</Text>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});