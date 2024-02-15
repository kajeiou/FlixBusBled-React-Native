import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SafeAreaView, StyleSheet } from 'react-native';
import ProfilScreen from '../userScreens/Profil/ProfilScreen';
const Tab = createMaterialTopTabNavigator();

export default function TabProfil() {
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
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
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