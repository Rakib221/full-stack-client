import React, { useContext, useEffect } from 'react';
import fakeData from '../../fakeData'
import { useState } from 'react'
import Product from './Product';
import { addToDatabaseCart } from '../../Utilities/databaseManager';
import './Shop.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
const Shop = () => {
    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    // console.log(fakeData);
    // const first12 = fakeData.slice(0, 12);
    // // console.log(first10);
    // const [products, setProducts] = useState(first12);
    const [cart, setCart] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [prPerPage, setPrPerPage] = useState(12);
    const handleAddProduct = (pd) => {
        // console.log("clicked",pd);
        const newCart = [...cart, pd]
        setCart(newCart);
        const sameProduct = newCart.filter(product => product.key === pd.key);
        const count = sameProduct.length;
        addToDatabaseCart(pd.key, count);
    }
    const handleChange = (e) => {
        setPrPerPage(e.target.value);
    }
    // console.log(cart.length);
    // handleAddProduct = {handleAddProduct}
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(`http://localhost:7777/products?page=${currentPage}&&numberOfProPerPage=${prPerPage}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / prPerPage);
                setPageCount(pageNumber);
            })
    }, [currentPage])
    const [color, setColor] = useState(null);
    console.log(prPerPage);
    return (
        <div className="row boxSizing">
            <div className="col-lg-1">

            </div>
            <div className="col-lg-10">
                {/* <h1 style={{color:'red'}}>{products.length}</h1> */}
                <ul className="gridContainer">
                    {
                        products.map(product => <Product handleAddProduct={handleAddProduct} key={product.key} product={product}></Product>)
                    }
                </ul>
                <div className="row">
                    <div className="col-lg-5">

                    </div>
                    <div className="pagination col-lg-2">
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