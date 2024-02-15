import React, { useRef } from 'react';
import {StyleSheet, Text, View, Image, Animated, NativeModules   } from 'react-native';

import CustomButton from '../../components/CustomButton';
import DividerButton from '../../components/DividerButton';
import Title from '../../components/Title';
import CustomContainer from '../../components/CustomContainer';
import { useNavigation } from '@react-navigation/native';
import SliIcon from 'react-native-vector-icons/SimpleLineIcons';

const {CalendarModule} = NativeModules;

export default function LaunchScreen() {
  const navigation = useNavigation();
  const button2Scale = useRef(new Animated.Value(1)).current;

  //const IconModule = NativeModules.IconModule;
  //console.log(IconModule);

  CalendarModule.createCalendarEvent('testName', 'testLocation');

  return (
    <CustomContainer>
      <Title text="Bienvenue"> </Title>

      <Text style={styles.description}>
        Trouvez le car qui vous emmène là où vous voulez !
       
      </Text>

      <View style={styles.groupButtons}>
        
        <CustomButton text="Inscription" onPress={() => navigation.navigate('Signup')} />
        
        <DividerButton></DividerButton>
        <Animated.View style={{ transform: [{ scale: button2Scale }] }}>
          <CustomButton text="Connexion" onPress={() => navigation.navigate('Login')} outline />
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
    marginBottom: 30,
    color: "#808080",
    lineHeight: 24,
  },
  groupButtons: {
    flexDirection: 'row',
    justifyContent: "center",
    paddingBottom: 100,
  }
});
