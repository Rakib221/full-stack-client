import React, { useContext, useEffect } from 'react';
import fakeData from '../../fakeData'
import { useState } from 'react'
import Product from './Product';
import { addToDatabaseCart } from '../../Utilities/databaseManager';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
const Shop = () => {
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    // const first12 = fakeData.slice(0, 12);
    // const [products, setProducts] = useState(first12);
    const [cart, setCart] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [prPerPage, setPrPerPage] = useState(12);
    const handleAddProduct = (pd) => {
        const newCart = [...cart, pd]
        setCart(newCart);
        const sameProduct = newCart.filter(product => product._id === pd._id);
        const count = sameProduct.length;
        addToDatabaseCart(pd._id, count);
        // const sameProduct = newCart.filter(product => product._id === pd._id);
        // const count = sameProduct.length;
        // addToDatabaseCart(pd._id, count);
    }
    const handleChange = (e) => {
        setPrPerPage(e.target.value);
    }
    // handleAddProduct = {handleAddProduct}
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(`https://full-stack-server-hasan.up.railway.app/products?page=${currentPage}&&numberOfProPerPage=${prPerPage}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / prPerPage);
                setPageCount(pageNumber);
            })
    }, [currentPage])
    const [color, setColor] = useState(null);

    return (
        <div className="row boxSizing">
            <div className="col-lg-1 col-md-1 col-sm-1">

            </div>
            <div className="col-lg-10">
                {/* <h1 style={{color:'red'}}>{products.length}</h1> */}
                <ul className="gridContainer">
                    {
                        products.map(product => <Product handleAddProduct={handleAddProduct} _id={product._id} product={product}></Product>)
                    }
                </ul>
                <div className="row mt-5">
                    <div className="col-lg-5">

                    </div>
                    <div className="pagination d-flex justify-content-center align-items-center col-lg-2">
                        {
                            [...Array(pageCount).keys()].map(number => <button className={number + 1 === currentPage ? 'selected' : 'btn btn-danger'} key={number} onClick={() => setCurrentPage(number + 1)}>{number + 1}</button>)
                        }
                    </div>
                    <div className="col-lg-5">

                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-lg-4">

                    </div>
                    <div className="col-lg-4">
                        {
                            <div className="custom-select d-flex justify-content-center align-items-center" style={{width:"200px"}}>
                                <p>Select number of product per page</p>
                                <select onChange={handleChange}>
                                    <option value="12">12</option>
                                    <option value="8">8</option>
                                    <option value="16">16</option>
                                </select>
                            </div>
                        }
                    </div>
                    <div className="col-lg-4">

                    </div>
                </div> */}
            </div>
            <div className="col-lg-1">
            </div>
        </div>
    );
};

export default Shop;