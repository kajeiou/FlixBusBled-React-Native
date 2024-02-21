
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Ride } from '../classes/Ride';


const firestore = getFirestore();
const storage = getStorage();


const RideService = {

    getRides: async () => {
        try {
          const ridesCollectionRef = collection(firestore, "rides");
          const querySnapshot = await getDocs(ridesCollectionRef);
          
          const rides = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const ride = new Ride(
              doc.id,
              data.arrival_date,
              data.arrival_geo,
              data.arrival_location,
              data.imageURIs,
              data.notes,
              data.origin_date,
              data.origin_geo,
              data.origin_location,
              data.price,
              data.seat_limit
            );
            rides.push(ride);
          });
          
          return rides;
        } catch (error) {
          console.error("Error fetching rides:", error);
          throw error;
        }
      }
}
export default RideService;