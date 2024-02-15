import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../userScreens/Home/Home';
import Profil from '../userScreens/Profil/Profil';

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="TabHome" options={{ title: 'Accueil', headerShown: false }}>
        {() => <Home/>}
      </Stack.Screen>
      <Stack.Screen
        name="TabProfil"
        component={Profil}
        options={{
          title: 'Profil',
          headerShown: false,
        }}
      />



    </Stack.Navigator>
  );
}
