'use client';

import { useEffect, useState } from 'react';

export default function WelcomeMessage() {
  const [line1, setLine1] = useState('Welcome. Viewing from: Loading...');
  const [line2, setLine2] = useState('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateWelcome = async () => {
      try {
        // Get location data
        let locationData = null;
        const cachedLocation = sessionStorage.getItem('geo_location_cache');
        const cacheTimestamp = sessionStorage.getItem('geo_cache_timestamp');
        
        // Check if cache is valid (1 hour)
        const isCacheValid = cacheTimestamp && 
          (Date.now() - parseInt(cacheTimestamp, 10)) < 3600000;

        if (isCacheValid && cachedLocation) {
          locationData = JSON.parse(cachedLocation);
        } else {
          // Fetch fresh location data
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

        // Get greeting based on hour
        const hour = now.getHours();
        let greeting = 'Good Night';
        if (hour >= 5 && hour < 12) greeting = 'Good Morning';
        else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
        else if (hour >= 17 && hour < 22) greeting = 'Good Evening';

        // Build location string
        const location = locationData 
          ? `${locationData.city}, ${locationData.country_name}`
          : 'Unknown Location';

        // Line 1: day date month time location
        setLine1(`${dayName} ${day} ${monthName} ${hours}:${minutes}:${seconds} ${location}`);
        // Line 2: greeting
        setLine2(greeting);

      } catch (error) {
        console.error('Error fetching location:', error);
        setLine1('Welcome. Viewing from: Location unavailable');
        setLine2('');
      }
    };

    // Update immediately
    updateWelcome();

    // Update every second for time
    intervalId = setInterval(updateWelcome, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full text-[18px] lg:text-[28px] font-bold leading-none tracking-tight-2">
      <div>{line1}</div>
      {line2 && <div>{line2}</div>}
    </div>
  );
}
