import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOut from './CheckOut';
const stripePromise = loadStripe('pk_test_51LHPvMCwR3lW733ycctzU2ulQpUuQGat1RPPtzy08smDlgLDURCIJPiBnq12txQoeRQJjMA77BZENSfgqWR3QLTr001zcBacK8');
const Payment = () => {
    const { orderId } = useParams();
    const [orderForPayment, setOrderForPayment] = useState({});
    const [clientSecret, setClientSecret] = useState({});
    useEffect(() => {
        fetch(`https://full-stack-server-hasan.up.railway.app/payment/${orderId}`)
            .then(response => response.json())
            .then(paymentOrder => {
                setOrderForPayment(paymentOrder);
            })
    }, [orderId]);
    return (
        <div>
            <h1>Make a payment {orderForPayment.price} $</h1>
            {
                orderForPayment.price && <Elements stripe={stripePromise}>
                    <CheckOut orderForPayment={orderForPayment}></CheckOut>
                </Elements>
            }
        </div>
    );
};

export default Payment;