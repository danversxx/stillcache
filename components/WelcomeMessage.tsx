'use client';

import { useEffect, useState } from 'react';

export default function WelcomeMessage() {
  const [line1, setLine1] = useState('Loading...');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');

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

        // Get timezone abbreviation from the user's browser
        const tzAbbr = now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop() || '';

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

        // Line 1: Tuesday 17 February 18:00:00 EST
        setLine1(`${dayName} ${day} ${monthName} ${hours}:${minutes}:${seconds} ${tzAbbr}`);
        // Line 2: New York, USA
        setLine2(location);
        // Line 3: Good Evening
        setLine3(greeting);

      } catch (error) {
        console.error('Error fetching location:', error);
        setLine1('Location unavailable');
        setLine2('');
        setLine3('');
      }
    };

    updateWelcome();
    intervalId = setInterval(updateWelcome, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full text-[18px] lg:text-[28px] font-bold leading-none tracking-tight-2 flex flex-col gap-0">
      <div>{line1}</div>
      {line2 && <div>{line2}</div>}
      {line3 && <div className="mt-[1em]">{line3}</div>}
    </div>
  );
}
