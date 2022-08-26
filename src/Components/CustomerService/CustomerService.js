import React from 'react';
import { ImWarning } from 'react-icons/im';
const CustomerService = () => {
    return (
        <div className="py-5 boxSizing">
            <div className="row py-3">
                <div className="col-lg-2">

                </div>
                <div className="col-lg-8 alignment p-3 border-style rounded ">
                    <ImWarning className="icon-color" size={18} />
                    swm-pl We'll refund a product shipped by Amazon within a maximum of 14 days. You will be able to see the reimbursement on your bank statement within 5-7 days from the moment it is made. For more information, please visit our refunds support page .
                </div>
                <div className="col-lg-2">

                </div>
            </div>
            <div className="row">
                <div className="col-lg-2">

                </div>
                <div className="col-lg-8 alignment p-3 border-style rounded ">
                    <div className="d-flex">
                    <ImWarning className="icon-color" size={18} />
                    <p className=" bolder">Possible payment problems for Prime subscription.</p>
                    </div>
                    If you receive a notification after the trial period ends that you need to fix a payment problem in order to continue using your Prime subscription, please remove and re-add your payment method. Alternatively, you can use a different card. Make sure the card is valid and has enough funds. If reauthorization fails or fails, please contact our customer service. We recommend contacting us by phone or via chat.
                </div>
                <div className="col-lg-2">

                </div>
            </div>
        </div>
    );
};

export default CustomerService;