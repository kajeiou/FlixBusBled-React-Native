import React from 'react';
import { View,Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from 'react-native-vector-icons'

import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemLarge]} onPress={() => navigation.navigate('TabHome')}>
        <Text>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]} onPress={() => navigation.navigate('TabProfil')}>
        <Text>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },
    menuItem: {
      flex: 1,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItemSmall: {
      flex: 0.5, 
      backgroundColor: 'white',
    },
    menuItemLarge: {
      flex: 1, 
      backgroundColor: 'white',
    },
    menuItemText: {
      fontWeight: 'bold',
    },
    menuIcon : {
      color:'#900C3F',
      fontSize:30
    }
});
  