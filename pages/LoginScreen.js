import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Button } from 'native-base';

export const LoginScreen = ({navigation})=> {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E89D', '#0078FF']}
        style={styles.container}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 1 }}
      >
        <Text>Campus Companion</Text>
        <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Home')
      }
    >Press Me</Button>
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
