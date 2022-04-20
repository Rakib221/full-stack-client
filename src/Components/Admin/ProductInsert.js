import React from 'react';
import { useRef } from 'react';

const ProductInsert = () => {
    const nameRef = useRef('');
    const imgUrlRef = useRef('');
    const priceRef = useRef(0);
    const categoryRef = useRef('');
    const descriptionRef = useRef('');
    const handleAddProduct = (e) => {
        const name = nameRef.current.value;
        const imageUrl = imgUrlRef.current.value;
        const price = priceRef.current.value;
        const category = categoryRef.current.value;
        const description = descriptionRef.current.value;
        const productData = { name, imageUrl, price, category, description };
        // send request to post data on server
        fetch('http://localhost:7777/products', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
            .then(response => response.json())
            .then(productData => {
                alert("Product added successfully");
                e.target.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // nameRef.current.value = '';
        // imgUrlRef.current.value = '';
        // priceRef.current.value = 0;
        // categoryRef.current.value = '';
        // descriptionRef.current.value = '';
        e.preventDefault();
    }
    return (
        <div>
            <form action="/addProduct" onSubmit={handleAddProduct} method="post">
                <div class="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" ref={nameRef} name="name" placeholder="name" className="form-control" id="name" ></input>
                </div>
                <div class="mb-3">
                    <label for="price" className="form-label">Price</label>
                    <input type="text" ref={priceRef} name="price" placeholder="price" className="form-control" id="price" ></input>
                </div>
                <div class="mb-3">
                    <label for="category" className="form-label">Category</label>
                    <input type="text" ref={categoryRef} name="category" placeholder="category" className="form-control" id="category" ></input>
                </div>
                <div class="mb-3">
                    <label for="image" className="form-label">Image</label>
                    <input type="file" ref={imgUrlRef} name="image" placeholder="image" className="form-control" id="description" ></input>
                </div>
                <div class="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <input type="name" ref={descriptionRef} name="description" placeholder="description" className="form-control" id="description" ></input>
                </div>
                <button type="submit" className="btn btn-danger">Submit</button>
            </form>
        </div>
    );
};

export default ProductInsert;