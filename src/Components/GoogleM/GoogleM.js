import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import apiKey from './ApiKey';
// require('dotenv').config();
// console.log(process.env);

const containerStyle = {
  width: '400px',
  height: '400px'
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

function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <Marker
          onLoad={onLoad}
          position={position}
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)