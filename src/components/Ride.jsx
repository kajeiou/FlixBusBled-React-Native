

import React, { useRef, useState } from 'react';

import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, PanResponder, NativeModules  } from 'react-native';
import RideGeo from './RideGeo';
import { RectButton } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Fontisto';
import IconIc from 'react-native-vector-icons/Ionicons';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import IconAd from 'react-native-vector-icons/AntDesign';
import IconMci from 'react-native-vector-icons/MaterialCommunityIcons'; 
import DividerRow from './DividerRow';


const {ToastModule} = NativeModules;

const NotificationModule = NativeModules.NotificationModule;

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
        //ToastModule.createToast('Swiped left!');
        NotificationModule.createNotification("Réservation confirmée", `Vous venez de réserver votre trajet de ${ride.originLocation} à ${ride.arrivalLocation} !`);
        
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
          <Text style={styles.rideUser}>
            {ride.originLocation} <Icon name="bus" size={24} color='#F27438' style={styles.icon} /> {ride.arrivalLocation}
          </Text>
        </View>
        <Text style={styles.rideDetails}>
          <View style={styles.dateContainer}>
            <IconMi name="departure-board" size={24} color='#F27438' style={styles.icon} />
            <Text>{ride.getFormattedDate(ride.originDate)}</Text>
          </View>
          <View style={styles.dateContainer}>
            <IconMci name="bus-marker" size={24} color='#F27438' style={styles.icon} />
            <Text>{ride.getFormattedDate(ride.arrivalDate)}</Text>
          </View>
        </Text>

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
            <Text style={styles.textPrimary}>
              <IconAd name="arrowleft" size={16} color='white' style={styles.icon}  /> 
                Réserver mon ticket <DividerRow/>
                <Text style={styles.ridePrice}>
                  <IconIc name="pricetag" size={16} color='white' style={styles.icon} /> {ride.price} €
                </Text>
              
            </Text>
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
    textAlign:"center"
  },
  rideDetails: {
    fontSize: 18,
  },
  dateContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  ridePrice: {
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
  icon: {
    marginRight: 12,
    marginLeft: 12,
  },
});