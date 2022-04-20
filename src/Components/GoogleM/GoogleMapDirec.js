import React, { useState } from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import apiKey from './ApiKey';

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


function MyComponent({ origin, destination }) {
    const [directionResponse, setDirectionResponse] = useState(null);
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
                {origin !== '' && origin !== ' ' && destination !== '' && destination !== ' ' && <DirectionsService
                    // required
                    options={{
                        // destination: this.state.destination,
                        destination: {destination},
                        // origin: this.state.origin,
                        origin: {origin},
                        // travelMode: this.state.travelMode,
                        travelMode: 'DRIVING'
                    }}
                    // required
                    // callback={this.directionsCallback}
                    callback={res => {
                        if (res !== null) {
                            setDirectionResponse(res);
                        }
                    }}
                // optional
                // onLoad={directionsService => {
                //     console.log('DirectionsService onLoad directionsService: ', directionsService)
                // }}
                // // optional
                // onUnmount={directionsService => {
                //     console.log('DirectionsService onUnmount directionsService: ', directionsService)
                // }}
                />}
                {
                    directionResponse && <DirectionsRenderer
                        // required
                        options={{
                            // directions: this.state.response
                            directions: directionResponse
                        }}
                    // // optional
                    // onLoad={directionsRenderer => {
                    //     console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                    // }}
                    // // optional
                    // onUnmount={directionsRenderer => {
                    //     console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                    // }}
                    />
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)