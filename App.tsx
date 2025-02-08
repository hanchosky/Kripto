// Archivo: App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CryptoListScreen from './CryptoListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CryptoList" component={CryptoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
