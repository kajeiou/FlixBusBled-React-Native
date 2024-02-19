import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import Title from '../../components/Title';

import AuthService from "../../services/UserService";
import CustomButton from '../../components/CustomButton';
import DividerRow from '../../components/DividerRow';
import CustomTextInput from '../../components/CustomTextInput';
import CustomContainer from '../../components/CustomContainer';

import Icon from 'react-native-vector-icons/Entypo';
import IconMat from 'react-native-vector-icons/MaterialIcons';


export default function LoginScreen() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    setIsFormValid(email !== '' && password !== '');
  };

  const handleSignup = async () => {
    if (isFormValid) {
      try {
        await AuthService.signIn(email, password);
        alert("Tu t'es connecté avec succès");
      } catch (e) {
        alert(e.message);
      }
    } else {
      alert("Renseigne tous les champs.");
    }
  };
  
  const onChangeHandler = (textEntered, keyInput) => {
    switch(keyInput) {
      case 'email':
        setEmail(textEntered);
        break;
      case 'password':
        setPassword(textEntered);
        break;
      default:
        return false;
    }
  };
  

  return (
    <CustomContainer>
        <Title text="Connecte-toi !" />
        <DividerRow />
        <DividerRow />
        <Icon name="email" size={24} color='#F27438'  />
        <CustomTextInput
          placeholder="Adresse e-mail"
          value={email}
          onChangeText={(textEntered) => onChangeHandler(textEntered, 'email')}
          keyboardType="email-address"
        />  

        <IconMat name="password" size={24} color='#F27438'  /> 
       
        <CustomTextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={(textEntered) => onChangeHandler(textEntered, 'password')}
          secureTextEntry={true}
        />    

        <DividerRow />

        <CustomButton
          text="Me connecter maintenant"
          onPress={handleSignup}
          disabled={!isFormValid}
        >
          <IconMat name="lock-open" size={24} color='#ffffff'  />
        </CustomButton>
      </CustomContainer>
  );
}

const styles = StyleSheet.create({

});
