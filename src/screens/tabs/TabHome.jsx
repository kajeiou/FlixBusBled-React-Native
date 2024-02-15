import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiscoverScreen from '../userScreens/Home/DiscoverScreen';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function TabHome() {
  return (
    <SafeAreaView style={styles.container}>
     <Tab.Navigator
      tabBarOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 0,
          borderBottomColor: '#F27438',
          paddingTop: 25,
        },
        activeTintColor: '#4B4B4B',
        inactiveTintColor: '#4B4B4B',
        tabStyle: {
          height: 50,
        },
        labelStyle: {
          fontSize: 14,
          
        },
        indicatorStyle: {
          backgroundColor: '#F27438',
        },
      }}
      tabBarPosition="top"
    >
      <Tab.Screen
        name="Découvrir"
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Découvrir'
        }}
      />
    </Tab.Navigator>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});