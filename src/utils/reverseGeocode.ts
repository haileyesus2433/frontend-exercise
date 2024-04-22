import * as Location from "expo-location";

type paramType = {
  latitude: number;
  longitude: number;
};

// This Function Takes in latitude and longitude
//  reverse geocode it and return a string in the correct format

export const reverseGeocode = async ({ latitude, longitude }: paramType) => {
  try {
    const data = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    let city = data[0].city;
    let country = data[0].country;

    return `${city}, ${country}`;
  } catch (error) {
    throw error;
  }
};
