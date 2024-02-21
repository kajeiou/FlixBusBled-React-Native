import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';

import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconMci from 'react-native-vector-icons/MaterialCommunityIcons'; 


export default function RideGeo({ originGeo, arrivalGeo }) {

  const mapRef = React.useRef(null);
  const MAX_ZOOM_LEVEL = 20;
  const MIN_ZOOM_LEVEL = 3;
  const [zoom, setZoom] = useState(14);

  const [coordinates, setCoordinates] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState({
    latitude: arrivalGeo.latitude,
    longitude: arrivalGeo.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  useEffect(() => {
    const coords = [
      { latitude: originGeo.latitude, longitude: originGeo.longitude },
      { latitude: arrivalGeo.latitude, longitude: arrivalGeo.longitude },
    ];
    setCoordinates(coords);
  }, [originGeo, arrivalGeo]);

  const getLatLongDelta = (zoom, latitude) => {
    const LONGITUDE_DELTA = Math.exp(Math.log(360) - zoom * Math.LN2);
    const ONE_LATITUDE_DEGREE_IN_METERS = 111.32 * 1000;
    const accurateRegion =
      LONGITUDE_DELTA *
      (ONE_LATITUDE_DEGREE_IN_METERS * Math.cos(latitude * (Math.PI / 180)));
    const LATITUDE_DELTA = accurateRegion / ONE_LATITUDE_DEGREE_IN_METERS;
  
    return [LONGITUDE_DELTA, LATITUDE_DELTA];
  };

  const handleZoom = (isZoomIn = false) => {
    let currentZoomLevel = zoom;
    if (!isZoomIn && currentZoomLevel === MAX_ZOOM_LEVEL) {
      currentZoomLevel -= 1;
    } 
    else if (isZoomIn && currentZoomLevel === MIN_ZOOM_LEVEL) {
      currentZoomLevel += 1;
    }
    if (
      currentZoomLevel >= MAX_ZOOM_LEVEL ||
      currentZoomLevel <= MIN_ZOOM_LEVEL
    ) {
      return;
    }

    currentZoomLevel = isZoomIn ? currentZoomLevel + 1 : currentZoomLevel - 1;
    const zoomedInRegion = {
      ...selectedRegion,
      latitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude
      )[1],
      longitudeDelta: getLatLongDelta(
        currentZoomLevel,
        selectedRegion.latitude
      )[0]
    };

    setSelectedRegion(zoomedInRegion);
    setZoom(currentZoomLevel);
    mapRef?.current?.animateToRegion(zoomedInRegion, 100);
  };
  

  return (
    <View style={styles.map}> 
        <MapView
          ref={mapRef}
          style={{ width: '100%', height: '100%' }}
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
          >
            <IconMi name="departure-board" size={24} color='#F27438' style={styles.icon} />
          </Marker>
          <Marker
            coordinate={{ latitude: arrivalGeo.latitude, longitude: arrivalGeo.longitude }}
            title="Arrival"
          >
            <IconMci name="bus-marker" size={24} color='#F27438' style={styles.icon} />
          </Marker>
          {coordinates.length === 2 && (
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[1]}
              apikey="AIzaSyDQyKfla4S_Jw8sPzY9Dfjagw_nLz5W8Ls" 
              strokeWidth={3}
              strokeColor="orange"
            />
          )}
        </MapView>
        <View style={styles.zoomButtons}>
          <TouchableOpacity
            onPress={() => handleZoom(true)}
            disabled={zoom === MAX_ZOOM_LEVEL}
            style={[styles.zoomButton, { marginBottom: 10 }]}
          >
            <Icon
              name="add"
              size={22}
              style={{ opacity: zoom === MAX_ZOOM_LEVEL ? 0.2 : 1 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleZoom(false)}
            disabled={zoom === MIN_ZOOM_LEVEL}
            style={styles.zoomButton}
          >
            <Icon
              name="remove-outline"
              size={22}
              style={{ opacity: zoom === MIN_ZOOM_LEVEL ? 0.2 : 1 }}
            />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width:"100%",
    height:"100%",
    maxHeight: 400,
  },
  zoomButtons: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  zoomButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },

});