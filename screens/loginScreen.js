import React from 'react'; 
import { SafeAreaView, View, Text } from 'react-native';

const loginScreen = () => {
    return (
        <SafeAreaView style ={{flex: 1, justifyContent: 'center'}}>
        <View style = {{paddingHorizontal: 25}}/>
        <View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 

        <Text style = {{
            fontFamily: 'Playfair-display',
            fontSize: 28, 
            fontWeight: '500',
            color: FFF, 
            marginBottom: 30,
        }}
        >
        Login
        </Text> 
         </View> 

         <View> 
         <MaterialIcons name='alternate-email' size= {20} color= "#FFF" /> 
         </View> 
        </SafeAreaView>
    );
};

export default loginScreen; 
