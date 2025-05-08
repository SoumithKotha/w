// App.js or App.jsx
import React from 'react';
import Weather from './Weather';  // Import your Weather component

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>Weather App</h1>
      <Weather /> {/* Use the Weather component here */}
    </div>
  );
}

export default App;