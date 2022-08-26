import React from 'react';
import { GrLocation } from 'react-icons/gr';

const Map = () => {
    return (
        <div className='boxSizing'>
            <p className="navHover p-1" style={{align:'start',width: '250px', height: '60px'}}><span>Welcome</span> <br/> <GrLocation/><span style={{'fontWeight':'bold'}}>Select a shopping address.</span></p>
        </div>
    );
};

export default Map;