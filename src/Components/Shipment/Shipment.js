import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example"));
    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);

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
                <h1>Google map under work</h1>
            </div>
            <div className="col-lg-1"></div>
        </div>
    );
};

export default Shipment;