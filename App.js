
import React, { useState, useEffect } from 'react';
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
import { initializeApp } from '@firebase/app';
import { getDatabase, ref, push } from '@firebase/database';
import { Twilio } from 'twilio'; // Import Twilio
import { fireBaseApiKey, twillioToken } from 'react-native-dotenv';


// import environmental variables

const fireKey = fireBaseApiKey;
const twillioKey = twillioToken;

// mongodb variables
const name = data.name
const user = data.userVal
const number = data.favNumber


// Your Firebase configuration
const firebaseConfig = {
  apiKey: fireKey,
  authDomain: "campuscompanion-e5e4b.firebaseapp.com",
  databaseURL: "https://campuscompanion-e5e4b-default-rtdb.firebaseio.com",
  projectId: "campuscompanion-e5e4b",
  storageBucket: "campuscompanion-e5e4b.appspot.com",
  messagingSenderId: "243707578434",
  appId: "1:243707578434:web:b2cf64238c3bc6260ac5db",
  measurementId: "G-6P3XT05PXW"
};

// Your Twilio credentials
const twilioConfig = {
  accountSid: 'ACac018d180f9b8da009dd88b8bc23be83',
  authToken: twillioKey,
  twilioPhoneNumber: '+18334321237',
  recipientPhoneNumber: number, // Recipient's phone number (NEED TO UPDATE TO MATCH DATABASE MONGODB)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const App = () => {
  const [location, setLocation] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false);

  const twilioClient = new Twilio(
    twilioConfig.accountSid,
    twilioConfig.authToken
  );

  const liveLocationShare = () => {
    if (!sharingLocation) {
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

      setSharingLocation(true);
    } else {
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
              Geolocation.clearWatch(watchId);
              setSharingLocation(false);
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

        const dbRef = ref(database, 'locations/user1');
        push(dbRef, data)
          .then(() => {
            console.log('Location data sent successfully.');
            // Send an SMS when the location is shared
            sendSMS(
              `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
              twilioConfig.recipientPhoneNumber
            );
          })
          .catch((error) => {
            console.error('Error sending location data:', error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const message = username + "wants to share their location with you. Click this link to see where they are: https://cc23bucket.s3.us-east-2.amazonaws.com/index.html"

  const sendSMS = (message, recipientPhoneNumber) => {
    twilioClient.messages
      .create({
        body: message,
        from: twilioConfig.twilioPhoneNumber,
        to: recipientPhoneNumber,
      })
      .then((message) =>
        console.log(`SMS sent with SID: ${message.sid}`)
      )
      .catch((error) => console.error('Error sending SMS:', error));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome back, {data.name}!</Text>
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

