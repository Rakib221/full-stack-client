import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../Utilities/databaseManager';
import { Card, ListGroup } from 'react-bootstrap';
import SelectProducts from '../SelectProducts/SelectProducts';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import useAuth from '../Hook/useAuth';
// import { useAlert } from 'react-alert'

const Buy = () => {
    //   const alert = useAlert();
    // const { productKey } = useParams();
    // const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    const [filterProducts, setFilterProducts] = useState([]);
    const {price, setPrice} = useAuth();
    useEffect(() => {
        const selectProduct = getDatabaseCart();
        // const keys = Object.keys(selectProduct);
        const id = Object.keys(selectProduct);

        fetch('https://full-stack-server-hasan.up.railway.app/products/_id', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(id),
        })
            .then(response => response.json())
            .then(products => {
                setFilterProducts(products);
            })
            .then(error => {
                console.log(error);
            })
        // const productKeys = Object.keys(selectProduct);
        // // const counts = productKeys.map(_id => selectProduct[_id]);

        // const newSelectProducts =  productKeys.map(_id => {
        //     const FProduct = fakeData.find(pd=> pd._id === _id);
        //     return FProduct;
        // })
        // setFilterProducts(newSelectProducts);
    }, [])
    
    const [cartProducts, setCartProducts] = useState([]);
    const handleAddToCartProduct = (cartProduct) => {
        const newCartProduct = [...cartProducts, cartProduct];
        setCartProducts(newCartProduct);
    }
    const total = Math.ceil(cartProducts.reduce((total, prod) => total + prod.price, 0));
    
    let shippingCost = 0;
    if (total > 0 && total < 500) {
        shippingCost = 13;
    }
    const vat = Math.ceil(total * 0.05);

    const finalTotal = total + shippingCost + vat;
    setPrice(finalTotal);

// product_id instead of productKey
    const removeProduct = (productKey) => {
        const newFilterProduct = filterProducts.filter(pd => pd._id !== productKey);
        setFilterProducts(newFilterProduct);
        removeFromDatabaseCart(productKey);
        // const newFilterProduct = filterProducts.filter(pd => pd._id !== product_id);
        // setFilterProducts(newFilterProduct);
        // removeFromDatabaseCart(product_id);
    }
    const history = useHistory();
    const purchasedDone = () => {
        history.push('/ordered');
        // setCartProducts([]);
        // alert('Oh look, an alert!');
    }
    return (
        <div className="row boxSizing p-2 mb-5">
            <div className="col-lg-8">
                {
                    filterProducts.map(filterPd => <SelectProducts removeProduct={removeProduct} handleAddToCartProduct={handleAddToCartProduct} filterPd={filterPd} key={filterPd.key}></SelectProducts>)
                }
            </div>
            <div className="col-lg-4 mt-3 d-flex justify-content-center">
                <Card style={{ width: '18rem', height: '15rem' }}>
                    <Card.Header className="cart">ADD TO CART</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Total Products: {cartProducts.length}</ListGroup.Item>
                        <ListGroup.Item>Shipping cost: {shippingCost}</ListGroup.Item>
                        <ListGroup.Item>VAt: {vat}</ListGroup.Item>
                        <ListGroup.Item>Total:{price}</ListGroup.Item>
                        <button onClick={purchasedDone} className="btn btn-primary">Purchase order</button>
                        <br />
                    </ListGroup>
                </Card>
            </div>
        </div>
    );
};

export default Buy;