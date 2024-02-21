import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
  updateEmail
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from "firebase/auth/react-native";
import firebaseConfig from './config/firebaseConfig';
import { setDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import { User } from '../classes/User';
import { setUserToAsyncStorage, getUserFromAsyncStorage } from "../utils/AsyncStorageUtil";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uploadBytesFromURI from '../utils/RNFetch';

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
try {
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (e) {
  console.log("User Service Initialisation Firebase", e)
}

export const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage();

const AuthService = {
  // Inscription de l'utilisateur
  register: async (email, displayName, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = new User(
        userCredential.user.uid,
        userCredential.user.email,
        displayName,
        "",
        new Date().toISOString(),
        "",
        "",
        new Date().toISOString()
      );

      // Enregistrer les données de l'utilisateur dans Firestore
      await setDoc(doc(firestore, 'users', user.uid), { ...user }, { merge: true });

      // Ajouter l'utilisateur dans AsyncStorage
      await setUserToAsyncStorage(user);

      return user;
    } catch (error) {
      console.log("Erreur lors de l'inscription de l'utilisateur:", error);
      throw error;
    }
  },

  // Connexion de l'utilisateur
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userSnapshot = await getDoc(doc(firestore, 'users', userCredential.user.uid));
      const userData = userSnapshot.data();

      if (!userData) {
        throw new Error('User data not found');
      }

      const lastLoginDate = new Date().toISOString();
      const updatedUserData = {
        ...userData,
        lastLogin: lastLoginDate
      };

      // Mettre à jour la date de dernière connexion de l'utilisateur dans Firestore
      await setDoc(doc(firestore, 'users', userCredential.user.uid), updatedUserData, { merge: true });

      const user = new User(
        userCredential.user.uid,
        userCredential.user.email,
        userData.displayName,
        userData.phoneNumber,
        userData.createdAt,
        userData.photoURL,
        userData.biography,
        lastLoginDate
      );

      // Enregistrer l'utilisateur dans AsyncStorage
      await setUserToAsyncStorage(user);
      console.log(getUserFromAsyncStorage())

      return user;
    } catch (error) {
      console.log("Erreur lors de la connexion de l'utilisateur:", error);
      throw error;
    }
  },

  // Mise à jour des informations de l'utilisateur
  updateUser: async (displayName, phoneNumber, biography) => {
    try {
      const user = await getUserFromAsyncStorage();
      const userRef = doc(firestore, 'users', user.uid);
      const userData = {
        displayName,
        phoneNumber,
        biography
      };

      // Mettre à jour les données de l'utilisateur dans Firestore
      await setDoc(userRef, userData, { merge: true });

      const storedUser = await getUserFromAsyncStorage();
      Object.assign(storedUser, userData);

      // Mettre à jour les données de l'utilisateur dans AsyncStorage
      await setUserToAsyncStorage(storedUser);

      return true;
    } catch (error) {
      console.log("Erreur lors de la mise à jour de l'utilisateur:", error);
      return false;
    }
  },

  // Mise à jour de l'image de profil de l'utilisateur
  updateImage: async (photoURI) => {
    try {
      const user = await getUserFromAsyncStorage();
      const imageRef = ref(storage, `users/${user.uid}/${Date.now().toString()}`);
  
      // Télécharger l'image à partir de l'URI et la téléverser sur Firebase Storage
      try {
        console.log('Téléchargement et téléversement de l\'image en cours...');
        await uploadBytesFromURI(imageRef, photoURI);
        console.log('Image téléversée avec succès sur Firebase Storage.');
      } catch (uploadError) {
        console.error('Erreur 1 lors du téléversement de l\'image sur Firebase Storage:', uploadError);
        throw new Error('Erreur lors du téléversement de l\'image sur Firebase Storage: ' + uploadError.message);
      }
  
      // Récupérer le lien de téléchargement de l'image
      let downloadURL;
      try {
        downloadURL = await getDownloadURL(imageRef);
        console.log('Lien de téléchargement de l\'image récupéré avec succès:', downloadURL);
      } catch (downloadError) {
        console.error('Erreur 2 lors de la récupération du lien de téléchargement de l\'image:', downloadError);
        throw new Error('Erreur lors de la récupération du lien de téléchargement de l\'image: ' + downloadError.message);
      }
  
      // Mettre à jour le lien de l'image dans Firestore
      const userData = { photoURL: downloadURL };
      const userRef = doc(firestore, 'users', user.uid);
      try {
        await setDoc(userRef, userData, { merge: true });
        console.log('Lien de l\'image mis à jour avec succès dans Firestore.');
      } catch (firestoreError) {
        console.error('Erreur 3 lors de la mise à jour du lien de l\'image dans Firestore:', firestoreError);
        throw new Error('Erreur lors de la mise à jour du lien de l\'image dans Firestore: ' + firestoreError.message);
      }
  
      // Mettre à jour les données de l'utilisateur dans AsyncStorage
      const storedUser = await getUserFromAsyncStorage();
      Object.assign(storedUser, { photoURL: userData.photoURL });
      try {
        await setUserToAsyncStorage(storedUser);
        console.log('Données de l\'utilisateur mises à jour avec succès dans AsyncStorage.');
      } catch (asyncStorageError) {
        console.error('Erreur 4 lors de la mise à jour des données de l\'utilisateur dans AsyncStorage:', asyncStorageError);
        throw new Error('Erreur 4 lors de la mise à jour des données de l\'utilisateur dans AsyncStorage: ' + asyncStorageError.message);
      }
  
      return true;
    } catch (error) {
      console.error('Erreur générale lors de la mise à jour de l\'image de profil:', error);
      return error;
    }
  }
,  

  // Mise à jour de l'adresse e-mail de l'utilisateur
  emailUpdate: async (email) => {
    try {
      await updateEmail(auth.currentUser, email);
      return true;
    } catch (e) {
      return e.message;
    }
  },

  // Envoi de la vérification de l'e-mail de l'utilisateur
  verification: async () => {
    try {
      return await sendEmailVerification(auth.currentUser);
    } catch (e) {
      return e.message;
    }
  },

  // Déconnexion de l'utilisateur
  signOut: async () => {
    try {
      return await signOut(auth);
    } catch (e) {
      return e.message;
    }
  },

  // Récupération des informations d'un utilisateur par ID
  getUserById: async (userId) => {
    try {
      const userSnapshot = await getDoc(doc(firestore, 'users', userId));
      if (userSnapshot.exists()) {
        return userSnapshot.data();
      } else {
        throw new Error('[User Service] User not found');
      }
    } catch (e) {
      throw e;
    }
  },
  
};

export default AuthService;
