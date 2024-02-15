import React, { useState, useEffect,  } from 'react';
import { RefreshControl } from 'react-native';
import CustomContainer from '../../../components/CustomContainer';

export default function DiscoverScreen() {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      fetch();
    }, []);
    
    const fetch = async () => {
      
    };
    
    const handleRefresh = () => {
     
    };
    
    return (
    <CustomContainer refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#900C3F"/>}>
      
    </CustomContainer>
    );
}