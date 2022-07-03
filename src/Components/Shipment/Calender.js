import React, { useState } from 'react';
// import isWeekend from 'date-fns/isWeekend';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const Calender = ({valueDate, setValueDate}) => {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    openTo="year"
                    value={valueDate}
                    // shouldDisableDate={isWeekend}
                    onChange={(newValue) => {
                        setValueDate(newValue);
                    }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default Calender;