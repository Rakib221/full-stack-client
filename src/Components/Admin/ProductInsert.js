import React from 'react';
import { useRef } from 'react';

const ProductInsert = () => {
    const nameRef = useRef('');
    const imgRef = useRef('');
    const priceRef = useRef(0);
    const wholePriceRef = useRef(0);
    const priceFractionRef = useRef(0);
    const stockRef = useRef(0);
    const categoryRef = useRef('');
    const starRef = useRef('');
    const sellerNameRef = useRef('');
    const starCountRef = useRef(0);
    const shippingRef = useRef(0);
    const urlRef = useRef('');
    const descriptionRef = useRef('');
    const handleAddProduct = (e) => {
        const name = nameRef.current.value;
        const img = imgRef.current.value;
        const price = parseInt(priceRef.current.value);
        const category = categoryRef.current.value;
        const description = descriptionRef.current.value;
        const star = parseInt(starRef.current.value);
        const seller = sellerNameRef.current.value;
        const wholePrice = wholePriceRef.current.value;
        const priceFraction = priceFractionRef.current.value;
        const stock = parseInt(stockRef.current.value);
        const starCount = parseInt(starCountRef.current.value);
        const shipping = parseInt(shippingRef.current.value);
        const url = urlRef.current.value;
        const productData = { name, seller, img, url, price, shipping, wholePrice, priceFraction, stock, category, star, starCount, description };
        // send request to post data on server
        fetch('https://full-stack-server-hasan.up.railway.app/products', {
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
        nameRef.current.value = '';
        imgRef.current.value = '';
        priceRef.current.value = 0;
        categoryRef.current.value = '';
        descriptionRef.current.value = '';
        starRef.current.value = '';
        sellerNameRef.current.value = '';
        wholePriceRef.current.value = '';
        priceFractionRef.current.value = '';
        stockRef.current.value = 0;
        starCountRef.current.value = 0;
        shippingRef.current.value = 0;
        urlRef.current.value = '';
        e.preventDefault();
    }
    return (
        <div className="row">
            <div className="col-lg-3">

            </div>
            <div className="col-lg-6">
                <form action="/addProduct" onSubmit={handleAddProduct} method="post">
                    <div class="mb-3">
                        <label for="name" className="form-label">Product Name</label>
                        <input type="text" ref={nameRef} name="name" placeholder="name" className="form-control" id="name" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="sellerName" className="form-label">Number of star for product</label>
                        <input type="text" ref={sellerNameRef} name="sellerName" placeholder="seller name" className="form-control" id="sellerName" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="price" className="form-label">Price</label>
                        <input type="number" ref={priceRef} name="price" placeholder="price" className="form-control" id="price" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="shipping" className="form-label">Shipping cost</label>
                        <input type="number" ref={shippingRef} name="shipping" placeholder="shipping cost" className="form-control" id="shipping" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="wholePrice" className="form-label">Whole price</label>
                        <input type="text" ref={wholePriceRef} name="price" placeholder="whole price" className="form-control" id="wholePrice" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="priceFraction" className="form-label">Price fraction</label>
                        <input type="text" ref={priceFractionRef} name="priceFraction" placeholder="price fraction" className="form-control" id="priceFraction" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="category" className="form-label">Category</label>
                        <input type="text" ref={categoryRef} name="category" placeholder="category" className="form-control" id="category" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="image" className="form-label">Image</label>
                        <input type="text" ref={imgRef} name="image" placeholder="image" className="form-control" id="image" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="url" className="form-label">Product Url</label>
                        <input type="text" ref={urlRef} name="url" placeholder="product url" className="form-control" id="url" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="stock" className="form-label">Stock</label>
                        <input type="text" ref={stockRef} name="star" placeholder="stock" className="form-control" id="stock" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="star" className="form-label">Number of star for product</label>
                        <input type="number" ref={starRef} name="star" placeholder="star" className="form-control" id="star" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="starCount" className="form-label">Number of star count</label>
                        <input type="number" ref={starCountRef} name="starCount" placeholder="star count" className="form-control" id="starCount" ></input>
                    </div>
                    <div class="mb-3">
                        <label for="description" className="form-label">Description</label>
                        <textarea type="text" ref={descriptionRef} name="description" placeholder="description" className="form-control" id="description" rows="5" cols="15" ></textarea>
                    </div>
                    <button type="submit" className="btn btn-danger">Submit</button>
                </form>
            </div>
            <div className="col-lg-3">

            </div>
        </div>
    );
};

export default ProductInsert;