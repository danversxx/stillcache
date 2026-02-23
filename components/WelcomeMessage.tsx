'use client';
import { useEffect, useState } from 'react';

export default function WelcomeMessage() {
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        return data;
      } catch {
        return null;
      }
    };

    const updateDateTime = async () => {
      const locationData = await fetchLocation();
      
      const now = new Date();
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      const dayName = dayNames[now.getDay()];
      const day = now.getDate();
      const monthName = monthNames[now.getMonth()];
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const tzAbbr = now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop() || '';

      const locationStr = locationData 
        ? `${locationData.city}, ${locationData.country_name}`
        : 'Unknown Location';

      setDateTime(`${dayName} ${day} ${monthName} ${hours}:${minutes}:${seconds} ${tzAbbr}`);
      setLocation(locationStr);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-center gap-0 md:gap-2">
      <div className="text-[14px] md:text-[18px] font-normal leading-none text-black">
        {dateTime}
      </div>
      {location && (
        <div className="text-[14px] md:text-[18px] font-normal leading-none text-black">
          {location}
        </div>
      )}
    </div>
  );
}
