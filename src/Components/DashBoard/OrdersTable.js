import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const OrdersTable = ({orders, setOrders}) => {
    console.log(orders);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell align="right">Order date</TableCell>
                            <TableCell align="right">Expected delivery date</TableCell>
                            <TableCell align="right">Condition</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="right">{row.createAt}</TableCell>
                                <TableCell align="right">{row.ExpectedDeliveryDate}</TableCell>
                                <TableCell align="right">Pending</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* <h4>Delivery address</h4>
                    <h4>Street number: {orders[0]?.StreetNameAndNumber}</h4>
                    <h4>House address: {orders[0]?.HouseNumberAndName}</h4> */}
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrdersTable;