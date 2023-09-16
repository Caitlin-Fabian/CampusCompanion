import * as React from 'react';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import {createNativeStackNavigator} from './node_modules/@react-navigation/native-stack';
import { HomeScreen } from './pages/homeScreen';
import  {LoginScreen}  from './pages/loginScreen';
import { Button } from 'react-native';

import { NativeBaseProvider, Box } from "native-base";
const Stack = createNativeStackNavigator();

export default MyStack = () => {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
};