import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOX66-QNFaO96Vzvvj84BLGKw4R1Cav10",
  authDomain: "campuscompanion-e5e4b.firebaseapp.com",
  projectId: "campuscompanion-e5e4b",
  storageBucket: "campuscompanion-e5e4b.appspot.com",
  messagingSenderId: "243707578434",
  appId: "1:243707578434:web:b2cf64238c3bc6260ac5db",
  measurementId: "G-6P3XT05PXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = () => {
  const [location, setLocation] = useState(null);

  const liveLocationShare = () => {
    useEffect(() => {
      const watchId = Geolocation.watchPosition(
        position => {
          console.log(position);
          setLocation(position);
        },
        error => {
          console.log(error.code, error.message);
          setLocation(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      return () => {
        Geolocation.clearWatch(watchId);
      };
    }, []);
  };

  const sendLocation = () => {
    try {
      if (location) {
        const friend = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
        const url = 'https://campuscompanion-e5e4b-default-rtdb.firebaseio.com/'; // Replace with your backend endpoint
        Linking.openURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Share Live Location" onPress={liveLocationShare} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
