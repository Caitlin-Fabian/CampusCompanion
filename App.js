import * as React from 'react';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import {createNativeStackNavigator} from './node_modules/@react-navigation/native-stack';
import { HomeScreen } from './pages/homeScreen';
import { LoginScreen } from './pages/loginScreen';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};