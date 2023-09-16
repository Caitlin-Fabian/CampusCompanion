import { StyleSheet, Text, View } from 'react-native';
import {StyleSheet, View, Text, Button, PermissionsAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import LinearGradient from 'react-native-linear-gradient'; 

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNegative: 'Cancel',
        buttonPositive: 'Yes',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const App = () => {
  // state to hold location
  const [location, setLocation] = useState(false);
  // function to check permissions and get Location

  const liveLocationShare = () => {
    const [location, setLocation] = useState(null);
  
    useEffect(() => {
      const watchId = Geolocation.watchPosition(
        position => {
          console.log(position);
          setLocation(position);
        },
        error => {
          // Handle location error
          console.log(error.code, error.message);
          setLocation(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
  
      // Clean up the watchPosition when the component unmounts
      return () => {
        Geolocation.clearWatch(watchId);
      };
    }, []); // Empties dependency array means this effect runs once on component mount

  };
  // Function to Send Location to other user.
  const sendLocation = () => {
    try {
      if (location) {
        const friend = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
        const url = ``;
        Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00E89D', '#0078FF','#003365', '#FFFFFF']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text>Campus Companion</Text>
      </LinearGradient>
      <Button
        title="Share Live Location"
        onPress={this.liveLocationShare}
        />
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Send Location" onPress={sendLocation} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
