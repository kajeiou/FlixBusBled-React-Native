import React, { useRef } from 'react';
import {StyleSheet, Text, View, Image, Animated } from 'react-native';

import CustomButton from '../../components/CustomButton';
import DividerButton from '../../components/DividerButton';
import Title from '../../components/Title';
import CustomContainer from '../../components/CustomContainer';
import { useNavigation } from '@react-navigation/native';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconMatC from 'react-native-vector-icons/MaterialCommunityIcons';


export default function LaunchScreen() {
  const navigation = useNavigation();
  const button2Scale = useRef(new Animated.Value(1)).current;
  
  return (
    <CustomContainer>
      <Title text="Bienvenue"> <IconMatC name="rocket-launch" size={24} color='#F27438'  /></Title>

      <Text style={styles.description}>
        Trouvez le car qui vous emmène là où vous voulez !
        
      </Text>
      
      <Image source={require('../../../assets/images/bus_travel.jpg')} />

      <View style={styles.groupButtons}>
        
        <CustomButton text="Nous rejoindre" onPress={() => navigation.navigate('Signup')} >
          <IconMat name="person-add" size={24} color='#ffffff'  />
        </CustomButton>
        
        <DividerButton></DividerButton>
        <Animated.View style={{ transform: [{ scale: button2Scale }] }}>
          <CustomButton text="Me connecter" onPress={() => navigation.navigate('Login')}>
            <IconMat name="lock-open" size={24} color='#ffffff'  />
          </CustomButton>
        </Animated.View>
      </View>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 10,
    color: "#808080",
    lineHeight: 24,
  },
  groupButtons: {
    flexDirection: 'row',
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 100,
  }
});
