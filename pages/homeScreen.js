import * as React from 'react';
import { Button } from 'native-base';

export const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Login')
      }
    >Press Me</Button>
  );
};
