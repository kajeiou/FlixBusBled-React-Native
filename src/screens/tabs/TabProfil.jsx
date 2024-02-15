import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SafeAreaView, StyleSheet } from 'react-native';
import ProfilScreen from '../userScreens/Profil/ProfilScreen';
import TicketScreen from '../userScreens/Profil/TicketScreen';

const Tab = createMaterialTopTabNavigator();

export default function TabProfil() {
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
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
        }}
      />
      <Tab.Screen
        name="MyTickets"
        component={TicketScreen}
        options={{
          tabBarLabel: 'Mes tickets',
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