import React, { useState } from 'react';
import GoogleMapDirec from './GoogleMapDirec';

const OriginToDestination = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    return (
        <div>
            <input onBlur={e=>setOrigin(e.target.value)} type="text" placeholder="Your location"></input>
            <input onBlur={e=>setDestination(e.target.value)} type="text" placeholder="Destination"></input>
            <GoogleMapDirec origin={origin} destination={destination}></GoogleMapDirec>
        </div>
    );
};

export default OriginToDestination;