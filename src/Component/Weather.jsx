import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';

import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import search from '../assets/search.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(null);
  
  const allIcon = {
    '01d': clear,
    '01n': clear,
    '02d': cloud,
    '02n': cloud,
    '03d': drizzle,
    '03n': drizzle,
    '04d': rain,
    '04n': rain,
    '09d': snow,
    '09n': snow,
    '10d': humidity,
    '10n': humidity,
    '11d': wind,
    '11n': wind,
  };

  const searchWeather = async (city) => {
    try {
      const apiKey = 'daaec07979757601a78c4686caff5615';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      const icon = allIcon[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: parseFloat(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    searchWeather('London');
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" className="search" />
        <img
          src={search}
          alt="Search Icon"
          onClick={() => searchWeather(inputRef.current.value)}
        />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="Temperature">{weatherData.temperature}°C</p>
          <p className="City">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
