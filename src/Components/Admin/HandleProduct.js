import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HandleProduct.css';

const HandleProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://sleepy-coast-60059.herokuapp.com/products')
            .then((response) => response.json())
            .then(data => setProducts(data))
    }, []);
    const handleDeleteProduct = (id) => {
        const proceed = window.confirm("Are you sure? you want to delete this product!");
        if (proceed) {
            const url = `https://sleepy-coast-60059.herokuapp.com/products/${id}`;
            fetch(url, {
                method: 'DELETE',
                // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                // credentials: "include",
                // body: JSON.stringify(id)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Product deleted successfully");
                        const remainingProducts = products.filter(product => product._id !== id);
                        setProducts(remainingProducts);
                    }
                })
                .catch(error => { console.log(error) })
        }
    }
    return (
        <div className="row">
            <div className="col-lg-3">

            </div>
            <div className="col-lg-6">
                {
                    products.map((product) => <div className="product">
                        <p>Product Name: {product.name}</p>
                        <p>Product Id: {product._id}</p>
                        <Link to = {`/handleProduct/update/${product._id}`}><button className="btn btn-primary mx-2">Update</button></Link>
                        <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-danger">Delete</button>
                    </div>)
                }
            </div>
            <div className="col-lg-3"></div>
        </div>
    );
};

export default HandleProduct;