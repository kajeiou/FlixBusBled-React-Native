import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, } from 'react-native';

export default function RideGeo({originGeo,arrivalGeo}) {
    console.log(originGeo, arrivalGeo)
    return (
        <>
            <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: arrivalGeo.latitude,
            longitude: arrivalGeo.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: originGeo.latitude, longitude: originGeo.longitude }}
            title="Departure"
          />
          <Marker
            coordinate={{ latitude: arrivalGeo.latitude, longitude: arrivalGeo.longitude }}
            title="Arrival"
          />
        </MapView>
        <Text>
            Test
        </Text>
        </>
        
      );
}