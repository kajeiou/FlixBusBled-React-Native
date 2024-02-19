import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiscoverScreen from '../userScreens/Home/DiscoverScreen';
import { SafeAreaView, StyleSheet } from 'react-native';

import IconMatC from 'react-native-vector-icons/MaterialCommunityIcons';

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
        name="Découvrir"
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Découvrir',
          tabBarIcon: ({ color, size }) => (
            <IconMatC name="earth" color={color} size={16} />
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