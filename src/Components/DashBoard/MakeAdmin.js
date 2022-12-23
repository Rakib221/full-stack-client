import React, { useState } from 'react';
import useAuth from '../Hook/useAuth';

const MakeAdmin = () => {
    const [admin, setAdmin] = useState({adminEmail:''});
    const [success, setSuccess] = useState(false);
    const {token} = useAuth();
    const adminInformation = (e) => {
            const isValid = /\S+@\S+\.\S+/.test(e.target.value);
            if (isValid) {
                const adminData = {...admin};
                adminData.adminEmail = e.target.value;
                setAdmin(adminData);
            }
        }

    const handleAdmin = (e) => {
        fetch('https://full-stack-server-hasan.up.railway.app/users/admin',{
            method: 'PUT',
            headers: { 
                'authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(admin)
        })
        .then(response => response.json())
        .then(insertAdmin => {
            if (insertAdmin.matchedCount === 1) {
                setSuccess(true);
                alert("Admin added successfully");
                setAdmin('');
            }
            else{
                setSuccess(false);
                alert("Admin does not added");
                setAdmin('');
            }
        })
        .catch(error => {
            console.log(error);
        })
        e.preventDefault();
    }
    return (
        <div>
            <form onSubmit={handleAdmin}>
                <div className="mb-3">
                    <label htmlFor="adminEmail" className="form-label">Email address</label>
                    <input onBlur={adminInformation} type="adminEmail" name="adminEmail" className="form-control" id="adminEmail" aria-describedby="adminEmail" required></input>
                </div>
                <button type="submit" className="btn btn-danger">Add Admin</button>
            </form>
        </div>
    );
};

export default MakeAdmin;