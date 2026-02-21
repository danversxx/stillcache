'use client';

import { useEffect, useState } from 'react';

export default function WelcomeMessage() {
  const [dateTime, setDateTime] = useState('Loading...');
  const [locationGreeting, setLocationGreeting] = useState('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateWelcome = async () => {
      try {
        // Get location data
        let locationData = null;
        const cachedLocation = sessionStorage.getItem('geo_location_cache');
        const cacheTimestamp = sessionStorage.getItem('geo_cache_timestamp');
        
        const isCacheValid = cacheTimestamp && 
          (Date.now() - parseInt(cacheTimestamp, 10)) < 3600000;

        if (isCacheValid && cachedLocation) {
          locationData = JSON.parse(cachedLocation);
        } else {
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            locationData = await response.json();
            sessionStorage.setItem('geo_location_cache', JSON.stringify(locationData));
            sessionStorage.setItem('geo_cache_timestamp', Date.now().toString());
          }
        }

        // Format current date/time
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayName = days[now.getDay()];
        const day = now.getDate();
        const monthName = months[now.getMonth()];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Get timezone abbreviation
        const tzAbbr = now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop() || '';

        // Build location string (no greeting)
        const location = locationData 
          ? `${locationData.city}, ${locationData.country_name}`
          : 'Unknown Location';

        // Set date/time and location (no greeting)
        setDateTime(`${dayName} ${day} ${monthName}\n${hours}:${minutes}:${seconds} ${tzAbbr}`);
        setLocationGreeting(location);

      } catch (error) {
        console.error('Error fetching location:', error);
        setDateTime('Loading...');
        setLocationGreeting('');
      }
    };

    updateWelcome();
    intervalId = setInterval(updateWelcome, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-2">
      <div className="text-[14px] font-normal leading-none tracking-tight-2">
        {dateTime}
      </div>
      {locationGreeting && (
        <div className="text-[14px] font-normal leading-none tracking-tight-2">
          {locationGreeting}
        </div>
      )}
    </div>
  );
}
