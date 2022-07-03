import React, { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';
import OrdersTable from './OrdersTable';

const UserOrders = () => {
    const {loggedAndSignedInUser, setLoggedAndSignedInUser} = useAuth();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const url = `http://localhost:7777/orders?uid=${loggedAndSignedInUser.uid}`;
        fetch(url)
        .then((response) =>response.json())
        .then(data =>setOrders(data));
    },[loggedAndSignedInUser.uid])
    console.log("orders are ", orders);
    return (
        <div>
            <OrdersTable orders={orders} setOrders = {setOrders}></OrdersTable>
        </div>
    );
};

export default UserOrders;