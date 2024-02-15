

import React, { useRef, useState } from 'react';

import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, PanResponder  } from 'react-native';
import RideGeo from './RideGeo';
import CustomButton from './CustomButton';
import { RectButton } from 'react-native-gesture-handler';


export default function Ride({ride} ) {

  const lastTapRef = useRef(null);
  const [buttonPositionX, setButtonPositionX] = useState(new Animated.Value(0));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: buttonPositionX }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx < -100) {
        
        console.log('Swiped left!');
      }
      Animated.spring(buttonPositionX, {
        toValue: 0,
        useNativeDriver: false
      }).start();
    }
  });
  


  const handleDoubleTap = (rideId) => {
    const doubleTapDelay = 300; // 300 milliseconds
    const now = Date.now();
    const lastTap = lastTapRef.current;
    lastTapRef.current = now;

    if (lastTap && now - lastTap < doubleTapDelay) {
    console.log("double tap")

    }
  };

  return (
    <TouchableWithoutFeedback key={ride.id} onPress={() => handleDoubleTap(ride.id)}>
      <View style={styles.ride}>
        <View style={styles.rideHeader}>
          <Text style={styles.rideUser}>{ride.originLocation} to {ride.arrivalLocation}</Text>
        </View>
        <Text style={styles.rideDetails}>
          Départ : {ride.getFormattedDate(ride.originDate)},
          Arrivée : {ride.getFormattedDate(ride.arrivalDate)}
        </Text>
        <Text style={styles.rideDetails}>Price: {ride.price} €</Text>
        <RideGeo originGeo={ride.originGeo} arrivalGeo={ride.arrivalGeo} />
        
        <Animated.View
          style={{
            transform: [{ translateX: buttonPositionX }]
          }}
        >
          <RectButton
            onPress={() => console.log('Button pressed!')}
            style={[styles.button]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.textPrimary}>Réserver mon ticket</Text>
          </RectButton>

        </Animated.View>

      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  ride: {
    width: '95%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rideHeader: {
    marginBottom: 8,
  },
  rideUser: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rideDetails: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F27438',
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row-reverse', 
    alignItems: 'center', 
  },
  textPrimary: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
});