import * as React from 'react';
import { Button } from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';
import { styles } from '../styles/style';
import { Center,Image, Square, Circle , Text} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MenuExample } from '../components/menu';
export const HomeScreen = ({navigation}) => {
  return (
    <LinearGradient
        colors={['#00E89D', '#0078FF']}
        style={styles.container}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 1 }}
      >
    {/* <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Login')
      }
      
    >Press Me</Button> */}
    <MenuExample/>
<Center>        
  <Text style={{fontFamily: 'Baloo-Regular'}} fontSize="2xl">Pop the bubble if you feel unsafe!</Text>
</Center>
<TouchableOpacity>
<Image style={{margin: 100}} source={require('../assets/image1.png')} alt="Alternate Text" size="xl" />
</TouchableOpacity>
<Center _text={{fontFamily:"Baloo-Regular", fontSize:"2xl", alignItems: 'center', textAlign: 'center'}}>This will share your location with your favorites!</Center>

    </LinearGradient>
  );
};
