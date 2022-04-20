import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JQBZIKJerLWy3FFvjA3KaatG2GJQocwGrmkVefC1mVVbNh0LtEEXNjTVkMQmilOhgJJlU1xIZWjSkHz9FZ4aAdh00fnHh9Vqj');
const Payment = () => {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <div>
            <Elements stripe={stripePromise} options={options}>
                <form>
                    <PaymentElement />
                    <button>Submit</button>
                </form>
            </Elements>
        </div>
    );
};

export default Payment;