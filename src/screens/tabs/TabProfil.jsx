import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SafeAreaView, StyleSheet } from 'react-native';
import ProfilScreen from '../userScreens/Profil/ProfilScreen';
import TicketScreen from '../userScreens/Profil/TicketScreen';
import IconFa from 'react-native-vector-icons/FontAwesome5';
import IconFe from 'react-native-vector-icons/Feather';

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
          paddingTop: 30,
        },
        activeTintColor: '#4B4B4B',
        inactiveTintColor: '#4B4B4B',
        tabStyle: {
          height: 60,
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
          tabBarLabel: 'Mon profil',
          tabBarIcon: ({ color, size }) => (
            <IconFa name="user-edit" color={color} size={16} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTickets"
        component={TicketScreen}
        options={{
          tabBarLabel: 'Mes tickets',
          tabBarIcon: ({ color, size }) => (
            <IconFe name="bookmark" color={color} size={16} />
          ),
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