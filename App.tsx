
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GuestNavigator from './src/screens/navigators/GuestNavigator'
import UserNavigator from './src/screens/navigators/UserNavigator';
import { useAuthentication } from './src/contexts/useAuthentification';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  const user = useAuthentication();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    
      <NavigationContainer>
        {user.user ? (
          <UserNavigator/>
        ) : (
          <GuestNavigator />
        )}
      </NavigationContainer>
  </GestureHandlerRootView>
  );
}
