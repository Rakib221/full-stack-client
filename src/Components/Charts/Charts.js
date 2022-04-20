import React from 'react';
import './Charts.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const data = [
    {
        name: "January",
        Electronics: 4000,
        Others: 2400,
    },
    {
        name: "February",
        Electronics: 3000,
        Others: 1398
    },
    {
        name: "March",
        Electronics: 2000,
        Others: 9800
    },
    {
        name: "April",
        Electronics: 2780,
        Others: 3908
    },
    {
        name: "May",
        Electronics: 1890,
        Others: 4800
    },
    {
        name: "June",
        Electronics: 2390,
        Others: 3800
    },
    {
        name: "July",
        Electronics: 3490,
        Others: 4300
    },
    {
        name: "August",
        Electronics: 4000,
        Others: 2400
    },
    {
        name: "September",
        Electronics: 3000,
        Others: 1398
    },
    {
        name: "October",
        Electronics: 2000,
        Others: 9800
    },
    {
        name: "November",
        Electronics: 2780,
        Others: 3908
    },
    {
        name: "December",
        Electronics: 1890,
        Others: 4800
    }
];

const Charts = () => {
    const previousYear =(new Date().getFullYear())-1;
    return (
        <div className="boxSizing">
            <h2>All Sales in {previousYear}</h2>
            <ResponsiveContainer width='100%' aspect={1}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3 3 6" horizontal={false}/>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Electronics" stroke="red" activeDot={{ r: 8 }} />
                    <Line type="mdataKey=" dataKey="Others" stroke="green" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;