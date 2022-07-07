import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabaseCart, removeFromDatabaseCart } from '../../Utilities/databaseManager';
import useAuth from '../Hook/useAuth';
import './Shipment.css';
import { useState } from 'react';
import OpenModal from './OpenModal';

const UserDetails = ({valueDate, setValueDate}) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    // const [open, setOpen] = useState(false);
    const { loggedAndSignedInUser, setLoggedAndSignedInUser, price, setPrice } = useAuth();
    const [handleModal, setHandleModal] = useState({
        open: false,
        isOrderAvailable: false
    });
    const handleClose = () => {
        const closeModal = {...handleModal};
        closeModal.open = false;
        closeModal.isOrderAvailable = false;
        setHandleModal(closeModal);
    };
    const savedCart = getDatabaseCart();
        const onSubmit = data => {
            const savedCart = getDatabaseCart();
            if (Object.keys(savedCart).length > 0) {
            data.orders = savedCart;
            data.authEmail = loggedAndSignedInUser.email;
            data.uid = loggedAndSignedInUser.uid;
            data.price = price;
            data.ExpectedDeliveryDate = valueDate.toDateString();
            console.log(data);
            fetch('http://localhost:7777/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(confirmOrders => {
                    console.log(confirmOrders);
                    if (confirmOrders.insertedId) {
                        // alert("Order processed successfully")
                        const keysArray = Object.keys(savedCart);
                        keysArray.forEach(key => removeFromDatabaseCart(key));
                        console.log("savedCart", savedCart);
                        reset();
                        const openModal = { ...handleModal };
                        openModal.open = true;
                        openModal.isOrderAvailable = true;
                        setHandleModal(openModal);
                    }
                })
            }
            else{
                const orderNotAvailable = {...handleModal};
                orderNotAvailable.open = true;
                orderNotAvailable.isLoading = false;
                setHandleModal(orderNotAvailable);
            }
        };

    console.log(watch("example"));
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    console.log(loggedAndSignedInUser);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input placeholder="Your location" {...register("example", {required: true})} />
                    {errors.example && <span className="error">This field is required</span>}
                    <br />
                    <br /> */}
                <input placeholder="Name" defaultValue={loggedAndSignedInUser.name} {...register("Name", { required: true })} />
                {errors.Name && <span className="error">Name is required</span>}
                <br />
                <br />
                <input placeholder="Email" defaultValue={loggedAndSignedInUser.email} {...register("Email", { required: true })} />
                {errors.Email && <span className="error">E-mail is required</span>}
                <br />
                <br />
                <input placeholder="Mobile number" {...register("MobileNumber", { required: true })} />
                {errors.MobileNumber && <span className="error">Mobile number is required</span>}
                <br />
                <br />
                <input placeholder="Street name and number" {...register("StreetNameAndNumber", { required: true })} />
                {errors.StreetNameAndNumber && <span className="error">Street name and number is required</span>}
                <br />
                <br />
                <input placeholder="Postal code" {...register("PostalCode", { required: true })} />
                {errors.PostalCode && <span className="error">Postal code is required</span>}
                <br />
                <br />
                <input placeholder="House number and name" {...register("HouseNumberAndName", { required: true })} />
                {errors.HouseNumberAndName && <span className="error">House number and name is required</span>}
                <br />
                <br />
                <input placeholder="Apartment number" {...register("ApartmentNumber", { required: true })} />
                {errors.ApartmentNumber && <span className="error">Apartment number is required</span>}
                <br />
                <br />
                <input disabled value={valueDate.toDateString()} {...register("ExpectedDeliveryDate", { required: false })} />
                <br />
                <br />
                <input className="btn btn-danger" type="submit" />
            </form>
            <OpenModal handleModal = {handleModal} handleClose = {handleClose}></OpenModal>
        </div>
    );
};

export default UserDetails;