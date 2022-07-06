import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import UserOrders from './UserOrders';
import Calender from '../Shipment/Calender';
const DashBoardHome = () => {
    const [valueDate, setValueDate] = useState(new Date());
    return (
        <div>
            <Typography paragraph>
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2">
                        <Calender valueDate={valueDate} setValueDate={setValueDate}></Calender>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-7">
                        <UserOrders valueDate={valueDate} setValueDate={setValueDate}></UserOrders>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </Typography>
        </div>
    );
};

export default DashBoardHome;