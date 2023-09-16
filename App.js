import * as React from 'react';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import {createNativeStackNavigator} from './node_modules/@react-navigation/native-stack';
import { HomeScreen } from './pages/homeScreen';
import { LoginScreen } from './pages/loginScreen';
import { Button } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useFonts from './useFonts';

import { NativeBaseProvider, Box } from "native-base";
const Stack = createNativeStackNavigator();

export default MyStack = () => {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {

  return (
    <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />);
  }
  return(
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
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});