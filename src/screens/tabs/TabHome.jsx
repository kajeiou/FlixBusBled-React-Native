import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiscoverScreen from '../userScreens/Home/DiscoverScreen';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function TabHome() {
  return (
    <SafeAreaView style={styles.container}>
     <Tab.Navigator
      screenOptions={{
        activeTintColor: '#900C3F',
        inactiveTintColor: '#999999',
        style: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#DDDDDD',
          paddingTop:25
        },
        tabStyle: {
          height: 50,
        },
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        indicatorStyle: {
          backgroundColor: '#900C3F',
        },
      }}
      tabBarPosition="top"
    >
      <Tab.Screen
        name="Découvrir"
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Découvrir',
          
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