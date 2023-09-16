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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const App = () => {
  const [location, setLocation] = useState(null);

  const liveLocationShare = () => {
    useEffect(() => {
      const watchId = Geolocation.watchPosition(
        position => {
          console.log(position);
          setLocation(position);
          sendLocation(position); // Automatically send location when it updates
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
