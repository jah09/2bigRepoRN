import { StyleSheet, View,Text } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker,PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { FontAwesome5 } from '@expo/vector-icons';
//export const mapRef=React.createRef();
export default function MapModule() {
  const [storeInformation, setstoreInformation] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
 // console.log('tst sa',storeInformation);

  //hook to get the information from database
  useEffect(() => {
    const starCountRef = ref(db, "STOREINFO/");
    onValue(starCountRef, (snapshot) => {
     // const storePic=snapshot.val();
      const data = snapshot.val();
      const newStoreInfo = Object.keys(data).map((key) => ({
        id: key,
        StoreImage:data[key].StoreImage,
        ...data[key],
          
      }
      ) );
    
   //  console.log('mapScreen',newStoreInfo); //test if successfully fetch the datas in STOREINFORMATION
      setstoreInformation(newStoreInfo);
    });
  },[]);

  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  //const [storeLocation, setStoreLocation] = useState([]);
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

  const handleMarkerPress = (place) => {
    setSelectedPlace(place);
  };
  
  // useEffect(()=>{
  //   const newStoreInfo = {...};
  //   //console.log('mapScreen',newStoreInfo); 
  //   const {storeloc}=newStoreInfo;
  //   console.log('new storeloc',storeloc);
  // },[])


  return (
    <View style={styles.container}>
      {location && (
        <MapView
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
           latitudeDelta:  0.01,
            longitudeDelta: 0.01,
            
          }}
          minZoomLevel={10}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsBuildings={true}
          zoomEnabled={true}
          showsTraffic={true}
          showsCompass={true}
          showsIndoors={true}
          loadingEnabled={true}
          loadingIndicatorColor={"gray"}
          userInterfaceStyle={'dark'}
          userLocationPriority={'balanced'}
          showsIndoorLevelPicker={true}
          toolbarEnabled={true}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            title='My Location'
            description='Tribo wakwak'
          >
        
          </Marker>
         {storeInformation.map(store=>(
          <Marker 
          key={store.id}
          coordinate={{
            latitude: store.Storelocation.latitude,
            longitude:store.Storelocation.longitude
          }}
          title={store.StoreName}
          description="Test1"
          pinColor={'#87cefa'}
          onPress={() => handleMarkerPress(store)}
         
          >
            
          </Marker>
         ))}
          
         
          
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
  map: {
    width: '100%',
    height: '100%',
    //flex:1
    //...StyleSheet.absoluteFillObject,
  }
})