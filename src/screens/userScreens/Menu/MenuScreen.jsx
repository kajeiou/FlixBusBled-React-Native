import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import IconF from 'react-native-vector-icons/Feather';
import IconMi from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]} onPress={() => navigation.navigate('TabHome')}>
        <IconMi name='home' style={styles.menuIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]} onPress={() => navigation.navigate('TabProfil')}>
        <IconF name='user' style={styles.menuIcon} />
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
      color:'#F27438',
      fontSize:30
    }
});
  