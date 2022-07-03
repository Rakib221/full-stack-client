import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, removeFromDatabaseCart } from '../../Utilities/databaseManager';
import GoogleM from '../GoogleM/GoogleM';
import useAuth from '../Hook/useAuth';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        data.orders = savedCart;
        data.authEmail = loggedAndSignedInUser.email;
        console.log(data);
        fetch('http://localhost:7777/orders',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(confirmOrders => {
            console.log(confirmOrders);
            if (confirmOrders.insertedId) {
                alert("Order processed successfully")
                const keysArray = Object.keys(savedCart);
                keysArray.forEach(key =>removeFromDatabaseCart(key));
                console.log("savedCart", savedCart);
                reset();
            }
        })
    };

    console.log(watch("example"));
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const {loggedAndSignedInUser,setLoggedAndSignedInUser} = useAuth();
    console.log(loggedAndSignedInUser);

    return (
        <div className="row m-5">
            <div className="col-lg-1"></div>
            <div className="col-lg-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <input placeholder="Your location" {...register("example", {required: true})} />
                    {errors.example && <span className="error">This field is required</span>}
                    <br />
                    <br /> */}
                    <input placeholder="Name" defaultValue = {loggedAndSignedInUser.name} {...register("Name", { required: true })} />
                    {errors.Name && <span className="error">Name is required</span>}
                    <br />
                    <br />
                    <input placeholder="Email" defaultValue = {loggedAndSignedInUser.email} {...register("Email", { required: true })} />
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
                    <input className="btn btn-danger" type="submit" />
                </form>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-5">
                <GoogleM></GoogleM>
            </div>
            <div className="col-lg-1"></div>
        </div>
    );
};

export default Shipment;