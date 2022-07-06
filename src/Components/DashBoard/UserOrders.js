import React, { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';
import OrdersTable from './OrdersTable';

const UserOrders = ({valueDate, setValueDate}) => {
    console.log(valueDate);
    const {loggedAndSignedInUser, setLoggedAndSignedInUser} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    console.log(loggedAndSignedInUser.uid);
    useEffect(() => {
        console.log("successfully enter in useEffect");
        const url = `http://localhost:7777/orders?uid=${loggedAndSignedInUser.uid}&date=${valueDate}`
        fetch(url)
        .then((response) =>response.json())
        .then(data =>setOrders(data))
    }, [valueDate]);
    console.log("orders are ", orders);
    return (
        <div>
            <OrdersTable orders={orders} setOrders = {setOrders}></OrdersTable>
        </div>
    );
};

export default UserOrders;