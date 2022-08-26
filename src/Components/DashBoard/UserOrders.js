import React, { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';
import OrdersTable from './OrdersTable';

const UserOrders = ({valueDate, setValueDate}) => {
    const {loggedAndSignedInUser, setLoggedAndSignedInUser, token} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const url = `https://sleepy-coast-60059.herokuapp.com/orders?uid=${loggedAndSignedInUser.uid}&date=${valueDate}`
        fetch(url,{
            headers:{
                'authorization': `Bearer ${token}`
            }
        })
        .then((response) =>response.json())
        .then(data =>setOrders(data))
    }, [valueDate]);

    return (
        <div>
            <OrdersTable orders={orders} setOrders = {setOrders}></OrdersTable>
        </div>
    );
};

export default UserOrders;