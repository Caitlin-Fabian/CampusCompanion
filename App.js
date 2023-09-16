import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
  Alert, // Import Alert from react-native
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { initializeApp } from '@firebase/app';
import { getDatabase, ref, push } from '@firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOX66-QNFaO96Vzvvj84BLGKw4R1Cav10",
  authDomain: "campuscompanion-e5e4b.firebaseapp.com",
  databaseURL: "https://campuscompanion-e5e4b-default-rtdb.firebaseio.com",
  projectId: "campuscompanion-e5e4b",
  storageBucket: "campuscompanion-e5e4b.appspot.com",
  messagingSenderId: "243707578434",
  appId: "1:243707578434:web:b2cf64238c3bc6260ac5db",
  measurementId: "G-6P3XT05PXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const App = () => {
  const [location, setLocation] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false); // State to track location sharing

  const liveLocationShare = () => {
    if (!sharingLocation) {
      // Start location sharing
      const watchId = Geolocation.watchPosition(
        position => {
          console.log(position);
          setLocation(position);
          sendLocation(position);
        },
        error => {
          console.log(error.code, error.message);
          setLocation(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      setSharingLocation(true); // Update state to indicate sharing
    } else {
      // Stop location sharing with confirmation dialog
      Alert.alert(
        'Stop Sharing Location',
        'Are you sure you want to stop sharing your location?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Stop',
            onPress: () => {
              Geolocation.clearWatch(watchId); // Stop watching location
              setSharingLocation(false); // Update state to indicate not sharing
            },
          },
        ]
      );
    }
  };

  const sendLocation = (position) => {
    try {
      if (position) {
        const timestamp = new Date().toISOString();
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: timestamp,
        };

        const dbRef = ref(database, 'locations/user1'); // Replace 'user1' with the appropriate user identifier
        push(dbRef, data)
          .then(() => {
            console.log('Location data sent successfully.');
          })
          .catch((error) => {
            console.error('Error sending location data:', error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={sharingLocation ? 'Stop Sharing Location' : 'Share Live Location'}
        onPress={liveLocationShare}
      />
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
