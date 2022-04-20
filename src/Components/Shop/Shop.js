import React, { useContext } from 'react';
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
    const first12 = fakeData.slice(0, 12);
    // console.log(first10);
    const [products, setProducts] = useState(first12);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (pd) => {
        // console.log("clicked",pd);
        const newCart = [...cart,pd]
        setCart(newCart);
        const sameProduct = newCart.filter(product=>product.key === pd.key);
        const count = sameProduct.length;
        addToDatabaseCart(pd.key,count);
    }
    // console.log(cart.length);
    // handleAddProduct = {handleAddProduct}
    const [color, setColor] = useState(null);
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
            </div>
            <div className="col-lg-1">
            </div>
        </div>
    );
};

export default Shop;