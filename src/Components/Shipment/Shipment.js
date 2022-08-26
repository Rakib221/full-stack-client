import React, { useState } from 'react';
import GoogleM from '../GoogleM/GoogleM';
import Calender from './Calender';
import UserDetails from './UserDetails';

const Shipment = () => {
    const [valueDate, setValueDate] = useState(new Date());
    return (
        <div className="row mt-2">
            <div className="col-lg-1"></div>
            <div className="col-lg-2">
                <UserDetails valueDate={valueDate} setValueDate={setValueDate}></UserDetails>
            </div>
            <div className="col-lg-4">
                <Calender valueDate={valueDate} setValueDate={setValueDate}></Calender>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-2">
                <GoogleM></GoogleM>
            </div>
            <div className="col-lg-1"></div>
        </div>
    );
};

export default Shipment;