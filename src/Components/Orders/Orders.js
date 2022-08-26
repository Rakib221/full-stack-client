import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import useAuth from './../Hook/useAuth';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const {loggedAndSignedInUser,setLoggedAndSignedInUser} = useAuth();
    const auth = loggedAndSignedInUser.email
    useEffect(() => {
        fetch(`https://sleepy-coast-60059.herokuapp.com/orders?email=${auth}`)
        .then(response => response.json())
        .then(data => setOrders(data))
    },[])
    const userOrders = orders.filter(user => user.authEmail === auth);
    // useEffect(() => {
    //     fetch('https://sleepy-coast-60059.herokuapp.com/ordersByEmail', {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify(auth)
    //     })
    //         // .then(response => response.json())
    // }, [])
    return (
        <div>
            {
                userOrders.map(order => <li>Email: {order.authEmail}</li>)
            }
        </div>
    );
};

export default Orders;