import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomContainer from "../../../components/CustomContainer";
import Title from '../../../components/Title';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomTextInput from '../../../components/CustomTextInput';
import AuthService from '../../../services/UserService';
import emptyPhoto from '../../../assets/images/empty_photo.png';
import CustomButton from '../../../components/CustomButton';
import { getUserFromAsyncStorage } from '../../../utils/AsyncStorageUtil';
import { View, StyleSheet, Image, TouchableOpacity, Text, NativeModules } from 'react-native';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

import IconMi from 'react-native-vector-icons/MaterialIcons';

const { ImagePickerModule, ToastModule } = NativeModules;

export default function ProfilScreen() {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biography, setBiography] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const [isFormModified, setIsFormModified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = await getUserFromAsyncStorage();

        setDisplayName(storedUser.displayName);
        setEmail(storedUser.email);
        setPhotoURL(storedUser.photoURL);
        setPhoneNumber(storedUser.phoneNumber);
        setBiography(storedUser.biography);
        setEmailVerified(storedUser.emailVerified);
      } catch (error) {
        console.log('[Profil Screen] Erreur lors du chargement des données:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isFormModified) {
      onChangeHandler();
    }
  }, [isFormModified]);

  const onChangeHandler = async () => {
    try {
      await AuthService.updateUser(
        displayName,
        phoneNumber,
        biography
      );
      setIsFormModified(false);
    } catch (error) {
      console.log("[Profil Screen]" + error.message);
    }
  };

  const handleChange = (key, value) => {
    switch (key) {
      case 'displayName':
        setDisplayName(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'biography':
        setBiography(value);
        break;
      default:
        break;
    }
    setIsFormModified(true);
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log("Profil Screen" + error.message);
    }
  };

  const convertImageToBinary = async (imageUri) => {
    try {
      if (imageUri.startsWith('content://')) {
        const imagePath = RNFS.CachesDirectoryPath + '/tempImage.png';
  
        // Copier l'image depuis l'URI vers un emplacement temporaire
        await RNFS.copyFile(imageUri, imagePath);
  
        // Lire les données binaires de l'image
        const imageData = await RNFS.readFile(imagePath, 'base64');
  
        return imageData;
      } else {
        throw new Error('URI de l\'image invalide : l\'URI doit commencer par "content://"');
      }
    } catch (error) {
      console.error('Erreur lors de la conversion de l\'image en données binaires sur Android :', error);
      throw error;
    }
  }
  const handleAttachImage = async () => {
    try {
      const imageUri = await new Promise((resolve, reject) => {
        ImagePickerModule.pickImage(uri => resolve(uri));
      });
      ToastModule.createToast("Image sélectionnée :" + imageUri)

      try {
        //const imageData = await convertImageToBinary(imageUri);
        //console.log(imageData)

        await AuthService.updateImage(imageUri);
        setIsFormModified(false);
      } catch (error) {
        console.log('[Profil Screen] Erreur lors de la mise à jour de l\'image sur Firebase:', error.message);
        ToastModule.createToast('Erreur lors de la mise à jour de l\'image sur Firebase :' + error)
      }
    }
    catch (error) {
        console.error('Erreur lors de la sélection de l\'image :', error);
        ToastModule.createToast('Erreur lors de la sélection de l\'image :' + error)
    }

    
    /*
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission d'accès à la bibliothèque d'images refusée");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.canceled === true) {
        return;
      }

      const { assets } = pickerResult;
      const uri = assets.length > 0 ? assets[0].uri : null;

      if (uri) {
        setPhotoURL(uri);
        setIsFormModified(true);

        try {
          await AuthService.updateImage(uri);
          setIsFormModified(false);
        } catch (error) {
          console.log('[Profil Screen] Erreur lors de la mise à jour de l\'image:', error.message);
        }
      }

      setIsFormModified(false);
    } catch (error) {
      console.log('[Profil Screen] Erreur lors de l\'attachement de l\'image:', error.message);
      alert('Erreur lors de l\'attachement de l\'image');
    }*/

  };

  return (
    <CustomContainer>
      <View style={styles.container}>
        <Title text={displayName} />
        <View style={styles.profileContainer}>
          <View style={styles.photoContainer}>
          <Image
            source={
              photoURL && photoURL !==''
                ? { uri: photoURL }
                : emptyPhoto
            }
            style={styles.userPhoto}
          />
          {emailVerified ? (
            <View style={styles.verifiedContainer}>
              <Octicons name="webhook" size={24} color="#2CC90D" />
              <Text style={styles.verifiedText}>verified</Text>
            </View>
          ) : (
            <View style={styles.verifiedContainer}>
              <Octicons name="webhook" size={24} color="#C90D37" />
              <Text style={styles.unverifiedText}>non vérifié</Text>
            </View>
          )}

          </View>
          <View style={styles.infoContainer}>
            <CustomTextInput
              placeholder="Nom d'affichage"
              value={displayName}
              onChangeText={(textEntered) => handleChange('displayName', textEntered)}
            />

            <CustomTextInput
              placeholder="E-mail"
              value={email}
              disabled
            />
            <TouchableOpacity onPress={handleAttachImage}>
              <IconMi name="camera-alt" size={30} color="#000" style={styles.buttonIcon} />
            </TouchableOpacity>

            <CustomTextInput
              placeholder="Numéro de téléphone"
              value={phoneNumber}
              onChangeText={(textEntered) => handleChange('phoneNumber', textEntered)}
              keyboardType="phone-pad"
            />

            <CustomTextInput
              placeholder="Biographie"
              value={biography}
              onChangeText={(textEntered) => handleChange('biography', textEntered)}
            />
          </View>
        </View>
        <CustomButton text="Déconnexion" onPress={handleLogout} >
          <IconMi name="logout" size={18} color="white" />
        </CustomButton>
      </View>
    </CustomContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 150
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  photoContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    padding:10,

  },
  userPhoto: {
    width: "100%",
    height: "100%",
    marginRight: 8,
    borderRadius: 50,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#900C3F',
  },

  verifiedContainer: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 12,
    color: '#900C3F',
  },
  unverifiedText: {
    fontSize: 12,
    color: '#900C3F',
  },
});
