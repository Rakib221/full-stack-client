import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
require('dotenv').config();

const containerStyle = {
  width: '400px',
  height: '450px'
};

// const center = {
//   lat: 0,
//   lng: -180
// }

const position = {
  lat: 51.775920,
  lng: 19.485550
};

const onLoad = marker => {
  console.log('marker: ', marker)
}

const GoogleM = () => {
  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <Marker
            onLoad={onLoad}
            position={position}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleM;