import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Add error state

  const getWeather = async () => {
    if (!city) {
      alert('Please enter a city');
      return;
    }

    setLoading(true);
    setError(null);  // Reset any previous errors

    try {
      const apiKey = process.env.REACT_APP_API_KEY;  // Ensure the API key is set in .env file
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(`Error: ${data.message}`);
      }

      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError(error.message);  // Set error message if there's an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'Arial' }}>
      <h2>{city || 'Enter City'}</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: '10px',
          width: '200px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={getWeather}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#3498db',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display any errors */}
      
      {weather && (
        <div
          style={{
            marginTop: '30px',
            display: 'inline-block',
            textAlign: 'left',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: '#f1f1f1',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌤 Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;