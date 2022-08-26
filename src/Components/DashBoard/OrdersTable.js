import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const OrdersTable = ({orders, setOrders}) => {
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
                            <TableCell align="right">Action</TableCell>
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
                                <TableCell align="right">{row.payment ? 'Paid':<Link to = {`/dashboard/payment/${row._id}`}><button>Pay</button></Link>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrdersTable;