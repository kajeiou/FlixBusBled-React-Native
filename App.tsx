
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import GuestNavigator from './src/screens/navigators/GuestNavigator'
import UserNavigator from './src/screens/navigators/UserNavigator';
import { useAuthentication } from './src/contexts/useAuthentification';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  const user = useAuthentication();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <NavigationContainer>
        {user.user ? (
          <UserNavigator/>
        ) : (
          <GuestNavigator />
        )}
      </NavigationContainer>
    </View>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

