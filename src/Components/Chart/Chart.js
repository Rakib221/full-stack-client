import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Chart = () => {
    const data = [
        {
            month: 'Jan',
            laptop: 4000,
            mobile: 2400,
            others: 2200,
            amt: 2400,
        },
        {
            month: 'Feb',
            laptop: 3000,
            mobile: 1398,
            others: 2700,
            amt: 2210,
        },
        {
            month: 'Mar',
            laptop: 2000,
            mobile: 9800,
            others: 2200,
            amt: 2290,
        },
        {
            month: 'Apr',
            laptop: 2780,
            mobile: 3908,
            others: 2000,
            amt: 2000,
        },
        {
            month: 'May',
            laptop: 1890,
            mobile: 4800,
            others: 3200,
            amt: 2181,
        },
        {
            month: 'June',
            laptop: 2390,
            mobile: 3800,
            others: 1800,
            amt: 2500,
        },
        {
            month: 'Jul',
            laptop: 3490,
            mobile: 4300,
            others: 2200,
            amt: 2100,
        },
        {
            month: 'Aug',
            laptop: 5490,
            mobile: 4700,
            others: 2400,
            amt: 2100,
        },
        {
            month: 'Sep',
            laptop: 2990,
            mobile: 5400,
            others: 2700,
            amt: 2100,
        },
        {
            month: 'Oct',
            laptop: 3490,
            mobile: 2300,
            others: 2300,
            amt: 2100,
        },
        {
            month: 'Nov',
            laptop: 4490,
            mobile: 4800,
            others: 2600,
            amt: 2100,
        },
        {
            month: 'Dec',
            laptop: 3090,
            mobile: 3800,
            others: 2400,
            amt: 2100,
        },
    ];
    return (
        <div>
            <div className="title-holder">
                <h2 className = "chart-title">All sales in 2021</h2>
            </div>
            <ResponsiveContainer width="95%" height={400}>
                <LineChart
                    width={500}
                    height={450}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="mobile" stroke="#F32013" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="laptop" stroke="#3EA4ED" />
                    <Line type="monotone" dataKey="others" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;