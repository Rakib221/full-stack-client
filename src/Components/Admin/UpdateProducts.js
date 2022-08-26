import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProducts = () => {
    const { id } = useParams();
    const [updateProduct, setUpdateProduct] = useState({ name: '', price: '', category: '', description: '' });
    useEffect(() => {
        fetch(`https://sleepy-coast-60059.herokuapp.com/products/${id}`)
            .then((response) => response.json())
            .then(data => setUpdateProduct(data))
    }, [id])
    
    const handleChange = (e) => {
        if (e.target.name === "name") {
            const updateName = e.target.value;
            const updatedProduct = { ...updateProduct };
            updatedProduct.name = updateName;
            setUpdateProduct(updatedProduct);
        }
        else if (e.target.name === "price") {
            const updatePrice = e.target.value;
            const updatedProduct = { ...updateProduct };
            updatedProduct.price = updatePrice;
            setUpdateProduct(updatedProduct);
        }
        else if (e.target.name === "image") {
            const updateImage = e.target.value;
            const updatedProduct = { ...updateProduct };
            updatedProduct.imageUrl = updateImage;
            setUpdateProduct(updatedProduct);
        }
        else if (e.target.name === "category") {
            const updateCategory = e.target.value;
            const updatedProduct = { ...updateProduct };
            updatedProduct.category = updateCategory;
            setUpdateProduct(updatedProduct);
        }
        else if (e.target.name === "description") {
            const updateDescription = e.target.value;
            const updatedProduct = { ...updateProduct };
            updatedProduct.description = updateDescription;
            setUpdateProduct(updatedProduct);
        }
    }
    const handleUpdateProduct = (e) => {
        const url = `https://sleepy-coast-60059.herokuapp.com/products/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateProduct)
        })
        .then(response => response.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                alert('Product updated successfully');
                setUpdateProduct({});
            }
        })
        e.preventDefault();
    }
    return (
        <div className="row">
            <div className="col-lg-3">

            </div>
            <div className="col-lg-6">
                <form action="/updateProduct" onSubmit={handleUpdateProduct} method="post">
                    <div class="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" name="name" placeholder="name" className="form-control" id="name" value={updateProduct.name} onChange={handleChange} ></input>
                    </div>
                    <div class="mb-3">
                        <label for="price" className="form-label">Price</label>
                        <input type="number" name="price" placeholder="price" className="form-control" id="price" value={updateProduct.price} onChange={handleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="category" className="form-label">Category</label>
                        <input type="text" name="category" placeholder="category" className="form-control" id="category" value={updateProduct.category} onChange={handleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="image" className="form-label">Image</label>
                        <input type="file" name="image" placeholder="image" className="form-control" id="description" onChange={handleChange}></input>
                    </div>
                    <div class="mb-3">
                        <label for="description" className="form-label">Description</label>
                        <textarea type="text" name="description" placeholder="description" className="form-control" id="description" rows="5" cols="15" value={updateProduct.description} onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-danger">Submit</button>
                </form>
            </div>
            <div className="col-lg-3">

            </div>
        </div>
    );
};

export default UpdateProducts;