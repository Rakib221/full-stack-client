import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const position = {
    lat: 51.775920,
    lng: 19.485550
};

const Direction = ({origin,destination,method}) => {
    const [response, setResponse] = useState(null);
    const directionsCallback = (res) => {
        if (res !== null) {
            setResponse(res);
        }
    }
    return (
            <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-10">
                    <LoadScript
                        googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}
                    >
                        <GoogleMap
                            id='direction-example'
                            mapContainerStyle={{
                                height: '500px',
                                width: '80%'
                            }}
                            zoom={12}
                            center={position}
                        >
                            <DirectionsService
                                // required
                                options={{
                                    destination: {destination},
                                    origin: {origin},
                                    travelMode: {method}
                                }}
                                // required
                                callback={directionsCallback}
                            />

                            {
                                response !== null && (
                                    <DirectionsRenderer
                                        // required
                                        options={{
                                            directions: response
                                        }}
                                    />
                                )
                            }
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div className="col-lg-1"></div>
            </div>
    );
};

export default Direction;