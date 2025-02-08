import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CryptoListScreen from './screens/CryptoListScreen';
import CryptoApi from './components/CryptoApi';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CryptoListScreen">
        <Stack.Screen name="CryptoListScreen" component={CryptoListScreen} />
        <Stack.Screen name="CryptoDetail" component={CryptoApi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
