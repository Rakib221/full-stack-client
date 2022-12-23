import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CircularProgress } from '@mui/material';

const CheckOut = ({ orderForPayment }) => {
    const { price, name, Email, StreetNameAndNumber, HouseNumberAndName, MobileNumber, _id } = orderForPayment;
    const [error, setError] = useState({});
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        fetch('https://full-stack-server-hasan.up.railway.app/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price })
        })
            .then(response => response.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error);
            setSuccess(false);
        } else {
            setError('');
        }
        //   payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        // email: Email,
                        // address: `${StreetNameAndNumber} ${HouseNumberAndName}`,
                        // mobile: MobileNumber
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess(false);
        }
        else {
            setError('');
            setSuccess(true);
            setProcessing(false);
            setPaymentSuccess(true);
        }

        const payment = {
            paid: paymentIntent.amount,
            transactionId: paymentIntent.client_secret.slice('_secret')[0],
            created: paymentIntent.created,
            currency: paymentIntent.currency,
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
            funding: paymentMethod.card.last4

        }
        fetch(`https://full-stack-server-hasan.up.railway.app/orders/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payment })
        })
            .then(response => response.json())
            .then(information => {
                const info = information;
            })
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {processing ? <CircularProgress></CircularProgress> : <button type="submit" disabled={!stripe}>
                    Pay ${price}
                </button>}
            </form>
            {
                error && <p style={{ color: 'red' }}>{error.message}</p>
            }
            {
                success && <p style={{ color: 'green' }}>Payment has done successfully</p>
            }
        </div>
    );
};

export default CheckOut;

// 1. install stripe and stripe react.js
// 2. set publishable key
// 3. Elements
// 4. Check out from
// --------------------------------------
// 5. Create payment method
// 6. Server create payment intent api
// 7. Load client secret
// 8. Confirm card payment
// 9. handle user error