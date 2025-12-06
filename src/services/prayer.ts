import axios from 'axios';

// Default to Dhaka coordinates if geolocation fails or not provided
const DEFAULT_LAT = 23.8103;
const DEFAULT_LNG = 90.4125;

export interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export const prayerApi = {
  async getTimings(lat: number = DEFAULT_LAT, lng: number = DEFAULT_LNG): Promise<PrayerTimesData | null> {
    try {
      const date = new Date();
      const timestamp = Math.floor(date.getTime() / 1000);
      
      const response = await axios.get('https://api.aladhan.com/v1/timings/' + timestamp, {
        params: {
          latitude: lat,
          longitude: lng,
          method: 1, // University of Islamic Sciences, Karachi (Common in BD/IndoPak)
          school: 1 // Hanafi (Common in BD)
        }
      });
      
      return response.data.data.timings;
    } catch (error) {
      console.error("Failed to fetch prayer times", error);
      return null;
    }
  }
};
