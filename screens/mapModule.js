import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function MapModule() {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setLocation(position.coords);
  //     },
  //     error => {
  //       //console.log(error);
  //       Alert.alert("Warning",error,"OK");
  //     },
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker 
          coordinate={{
            atitude: location.coords.latitude,
            longitude: location.coords.longitude
          }}
          title='My Location'
          description='naa ko sa andang'
          />

        </MapView>

      )}
    </View>
  )
}

const styles = StyleSheet.create({
  Text: {
    borderStartColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  map:{
    width: '100%',
    height: 400,
  }
})