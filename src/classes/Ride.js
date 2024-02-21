import { format, utcToZonedTime } from 'date-fns-tz';

export class Ride {
  constructor(
    id,
    arrivalDate,
    arrivalGeo,
    arrivalLocation,
    imageURIs,
    notes,
    originDate,
    originGeo,
    originLocation,
    price,
    seatLimit
  ) {
    this.id = id;
    this.arrivalDate = this.convertToParisTimezone(arrivalDate.toDate()); 
    this.arrivalGeo = { 
      latitude: arrivalGeo.latitude,
      longitude: arrivalGeo.longitude
    }; 
    this.arrivalLocation = arrivalLocation; 
    this.imageURIs = imageURIs || []; 
    this.notes = notes || ""; 
    this.originDate = this.convertToParisTimezone(originDate.toDate());
    this.originGeo = { 
      latitude: originGeo.latitude,
      longitude: originGeo.longitude
    }; 
    this.originLocation = originLocation; 
    this.price = price; 
    this.seatLimit = seatLimit;
  }

  convertToParisTimezone(date) {
    return utcToZonedTime(date, 'Europe/Paris');
  }
  getFormattedDate(date) {
    return format(date, "dd/MM/yyyy 'à' HH'h'mm");
  }
}
