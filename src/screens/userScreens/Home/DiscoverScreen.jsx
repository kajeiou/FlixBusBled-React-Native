import React, { useState, useEffect, NativeModules  } from 'react';
import { RefreshControl } from 'react-native';
import CustomContainer from '../../../components/CustomContainer';
import Ride from '../../../components/Ride';
import RideService from '../../../services/RideService';


export default function DiscoverScreen() {
    const [rides, setRides] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    
      

    useEffect(() => {
      fetchRides();
    }, []);
    
    const fetchRides = async () => {
      try {
        const response = await RideService.getRides();
        setRides(response);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };
    
    const handleRefresh = () => {
      console.log("refreshing")
      setRefreshing(true);
      fetchRides()
        .then(() => setRefreshing(false))
        .catch((error) => {
          console.error('Error refreshing rides:', error);
          setRefreshing(false);
        });
    };
    
    return (
    <CustomContainer refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#900C3F"/>}>
      {rides.map((ride) => (
          <Ride key={ride.id} ride={ride} />
        ))}
    </CustomContainer>
    );
}