import React, { useRef, useState } from 'react';
import Direction from './Direction';

const GoogleMapDirec = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [methodForGo, setMethodForGo] = useState('');
    const originRef = useRef('');
    const destinationRef = useRef('');
    const methodRef = useRef('');
    const handleDirection = (e) => {
        setOrigin(originRef.current.value);
        setDestination(destinationRef.current.value);
        setMethodForGo(methodRef.current.value);
        e.preventDefault();
    }
    return (
        <div>
            <h3 className="mt-3" style={{ textAlign: 'center', color: 'blue' }}>See the route to reach in service center</h3>
            <div className="row mb-1">
                <div className="col-lg-3"></div>
                <div className="col-lg-4">
                    <form onSubmit={handleDirection}>
                        <div className="mb-3">
                            <label htmlFor="yourLocation" className="form-label">Your location</label>
                            <input type="yourLocation" ref = {originRef} name="yourLocation" className="form-control" id="yourLocation" aria-describedby="yourLocation" required></input>
                            <label htmlFor="destination" className="form-label">Destination</label>
                            <input type="destination" ref = {destinationRef} name="destination" className="form-control" id="destination" aria-describedby="destination" placeholder="Location: Jana matejki 21/23, 90-231 Lodz" required></input>
                        </div>
                        <label for="cars">Choose vehicle:</label>
                        <select ref = {methodRef} id="vehicles" name="vehiclesList" form="vehiclesForm">
                            <option value="DRIVING">Drive</option>
                            <option value="BICYCLING">By cycle</option>
                            <option value="TRANSIT">Tram</option>
                            <option value="WALKING">Walk</option>
                        </select>
                        <br />
                        <button type="submit" className="btn btn-danger">Go</button>
                    </form>
                </div>
            </div>
            {
                <Direction origin = {origin} destination = {destination} method = {methodForGo}></Direction>
            }
        </div>
    );
};

export default GoogleMapDirec;